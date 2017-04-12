
//item object holds details of an item
//id = unique ID associated with the item.
//     ****Future Use**** differentiate between items with same name
//title=as entered by user
//checked=flag indicating whether item is checked(true) or unchecked(false)
var item = {
    id: 0,
    title : "",
    checked : false
};

//Container object having array of items.
var itemList = {
    item: []
};

//initialize the itemList by reading the existing items in starter HTML
var initializeItemList = function () {
    //loop through shopping-item class elements (span) and store the value.
    var uniqID = '';
    for(var i=0;i<$('.shopping-item').length;i++)
    {
        //create item object
        uniqID = Math.random().toString(36).substr(2, 9);
        item = {
            id : uniqID,
            title :  $('.shopping-item')[i].innerHTML,
            //checking the class name for checked identifier.
            checked : $('.shopping-item')[i].className.indexOf('checked')>=0
        };

        //add item to the itemList1
        itemList.item.push(item);
    }
}
//Helper function to print the list.
var printList = function () {
    if(itemList.item.length===0)
        console.log('Empty List');
    for(var i=0;i<itemList.item.length;i++)
    {
        console.log(itemList.item[i].id + "-" + itemList.item[i].title + "-" + itemList.item[i].checked);
    }
}

//add item to the list and render
var addItem = function (itemList,itemName,ulList) {
    //create item object
    item = {
        id: Math.random().toString(36).substr(2, 9),
        title : itemName,
        //checking the class name for checked identifier.
        checked : false
    };
    //add item to itemList
    itemList.item.push(item);

    //create string for adding li in the ul list
    var str = "<li>\n\t<span class='shopping-item'>" + itemName + "</span>\n\t<div class='shopping-item-controls'>\n\t\t<button class='shopping-item-toggle'>\n\t\t\t<span class='button-label'>check</span>\n\t\t</button>\n\t\t<button class='shopping-item-delete'>\n\t\t\t            <span class='button-label'>delete</span>\n\t\t</button>\n\t</div>\n</li>"
    ulList.append(str)

    //print item list
    printList();
}


//remove item from the list and remove the li element corresponding to the item.
var removeItem = function (itemList,itemName,liItem) {

    for(i=0;i<itemList.item.length;i++)
    {
        if(itemList.item[i].title===itemName) {

            itemList.item.splice(i, 1);
            //breaking out after first delete
            //one way to allow multiple items with same name
            break;
        }
    }
    //removing li from ul
    liItem.remove();

    //print item list
    printList();
}

//Toggle checked flag for the item and add/remove class from span tag
var toggleItem = function (itemList,itemName,liItem) {
    for(i=0;i<itemList.item.length;i++)
    {
        if(itemList.item[i].title===itemName)
        {
            //toggling checked flag for the item
            if(itemList.item[i].checked === false) {
                itemList.item[i].checked = true;
                //addClass/ toggleClass does not work
                liItem.className = 'shopping-item shopping-item__checked'
            }
            else if(itemList.item[i].checked === true){
                itemList.item[i].checked = false;
                //addClass/ toggleClass does not work
                liItem.className = 'shopping-item'
            }
        }
    }

    //print item list
    printList();
}

var renderUL = function (itemList) {
    //clearing current list
    $('ul').empty()
    var strCName='';
    var strHTML='';
    //loop through item list to add li to ul
    for(i=0;i<itemList.item.length;i++)
    {
        if(itemList.item[i].checked === true) {
            //addClass/ toggleClass does not work
            strCName = 'shopping-item shopping-item__checked'
        }
        else if(itemList.item[i].checked === false){
            //addClass/ toggleClass does not work
            strCName = 'shopping-item'
        }
        strHTML = "<li>\n\t<span class='"+strCName+"'>" + itemList.item[i].title + "</span>\n\t<div class='shopping-item-controls'>\n\t\t<button class='shopping-item-toggle'>\n\t\t\t<span class='button-label'>check</span>\n\t\t</button>\n\t\t<button class='shopping-item-delete'>\n\t\t\t            <span class='button-label'>delete</span>\n\t\t</button>\n\t</div>\n</li>"

        $('ul').append(strHTML)
    }

}


//initialize the
$()
{
    initializeItemList();
    printList();
    renderUL(itemList)
}

//handle Delete

// Event listeners

//event listener for Delete button
$('ul').on('click', 'li .shopping-item-delete',function(event){
    removeItem(itemList,this.closest('li').children[0].innerHTML,this.closest('li'))
    renderUL(itemList)
});

//event listener for Check button
$('ul').on('click', 'li .shopping-item-toggle',function(event){
    toggleItem(itemList,this.closest('li').children[0].innerHTML,this.closest('li').children[0])
    renderUL(itemList)
});

//event listener for Add button
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(itemList,$('#shopping-list-entry').val(),$('.shopping-list'))
    renderUL(itemList)
});