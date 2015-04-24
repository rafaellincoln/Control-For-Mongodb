function(listObj) 
{
    var objId = ObjectId();
    var data = '{ _id: ' + "ObjectId(objId.valueOf())";
    var valorColumn;
    var myCursor = db.getCollection('collection').find({ Namecollection: listObj["Namecollection"] });
    var myDocument = myCursor.hasNext() ? myCursor.next() : null;

    if(!myDocument)
        throw { name : "FunctionError", message : "Collection não existe!" }; 

    for(var doc in myDocument)
    {
        if (doc != "Namecollection" && doc != "_id")
        {
            switch(myDocument[doc])
            {
                case('string'):
                    valorColumn = listObj[doc] ? '\"' + listObj[doc]  + '\"' : null;
                    break;
                case('int'):
                    valorColumn = parseInt(listObj[doc]) ? parseInt(listObj[doc]) : 0;
                    break;
                default:
                    valorColumn = listObj[doc] ? '\"' + listObj[doc] + '\"' : null;
                    break;
            }

            data = data + ', ' + doc + ': ' + valorColumn;
        }
    }

    var document = eval('(' + data + '}' + ')');
    db.getCollection(listObj["Namecollection"]).save( document );
}