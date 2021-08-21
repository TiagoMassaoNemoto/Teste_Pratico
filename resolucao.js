const fs = require('fs');
Bro_Dat = require('./broken-database.json');

function Nome()
{
    for (i = 0; i < Bro_Dat.length; i++)
    {
        nome = Bro_Dat[i].name
        nome = nome.replace(/æ/g,'a');
        nome = nome.replace(/¢/g,"c");
        nome = nome.replace(/ø/g,"o");
        nome = nome.replace(/ß/g,"b");
        Bro_Dat[i].name = nome
    }
}

function Preco()
{
    for (i = 0; i < Bro_Dat.length; i++)
    {
        Bro_Dat[i].price = parseFloat(Bro_Dat[i].price)
    }
}

function Quantidade()
{
    for (i = 0; i < Bro_Dat.length; i++)
    {
        cont = 0
        for(quantidade in Bro_Dat[i])
        {
            cont++
        }
        if (cont == 4)
        {
            for(key_name in Bro_Dat[i])
            {
                if (key_name == "quantity")
                break
            
                else
                {
                part = Object.assign({}, Bro_Dat[i])
                delete part.id;
                delete part.name;

                delete Bro_Dat[i].price;
                delete Bro_Dat[i].category;
                Bro_Dat[i].quantity = 0
                Bro_Dat[i] = Object.assign(Bro_Dat[i],part)
                }
            }
        }
    }
}

function Ord_Nam_ID()
{
    saida = Object.values(Bro_Dat)
    saida = saida
    .sort((a,b) => 
    {
        return a.id - b.id
    })
    
    .sort((a,b) => 
    {
        if ( a.category < b.category )
        {
        return -1;
        }
        if ( a.category > b.category )
        {
        return 1;
        }
    return 0;
    })
    console.table(saida,["category", "id", "name"])
}

function Val_tot()
{
    for (i in Bro_Dat)
    {
        quantity = Bro_Dat[i].quantity
        price = Bro_Dat[i].price
        Bro_Dat[i].category_amount = quantity * price
    }
    console.table(Bro_Dat,["category", "category_amount"])
}

Quantidade()

Nome()

Preco()

json = JSON.stringify(Bro_Dat, null, 1)

//https://bognarjunior.wordpress.com/2016/01/16/nodejs-file-system-trabalhando-com-arquivos/
fs.writeFile('./saida.json', json,{enconding:'utf-8',flag: 'w'}, function (err) {
    if (err) throw err;
});

Ord_Nam_ID()

Val_tot()
