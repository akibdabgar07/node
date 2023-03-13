const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const port = 8083;
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const sqlconnect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'combo_db'
});
// Setting EJS as templating engine

app.set('view engine', 'ejs');

function queryDb(query) {
    return new Promise((resolve, reject) => {
        sqlconnect.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
}



    app.get('/com',async function (req, res) {
    
        async function dynamic_control(id,type) {

            if(type=="state"){
       
            const sel_query = `select * from option_master where select_master_id=${id} `;
            const result = await queryDb(sel_query);
    
            let str = "";
            
            let str1=`<tr>
            <td><label for="state"> State:-</label></td>
            <td><select name="state" id="state">` 

            for (let index = 0; index < result.length; index++) {
                str += `<option>${result[index].option_value}</option>`
    
               
       
            }
            let str2=`</select></td></tr><hr>`
            str1+=str+str2;
           return str1;
        }
    

       if(type=="gender"){

       
            const sel_query = `select * from option_master where select_master_id=${id} `;
            const result = await queryDb(sel_query);
    
            let str = "";
            
            let str1=`<tr><td><label for="gender"> Gender:-</label></td>`
            

            for (let index = 0; index < result.length; index++) {

                str+=`<td><input type="radio" name="gender" id="${result[index].option_value}" value="${result[index].option_value}"><label for="${result[index].option_value}">${result[index].option_value}</label>`
              
               
       
            }
            let str2=`</td></tr><hr>`
            str1+=str+str2;
           return str1;
        
    }


    if(type=="relation_status"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr>
        <td><label for="RelationStatus"> RelationStatus:-</label></td>
        <td><select name="RelationStatus" id="RelationStatus">` 

        for (let index = 0; index < result.length; index++) {
            str += `<option>${result[index].option_value}</option>`

           
   
        }
        let str2=`</select></td></tr><hr>`
        str1+=str+str2;
       return str1;
    }

    if(type=="subject"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr><td><label for="Subjects"> SUBJECTS:-</label></td>` 

        for (let index = 0; index < result.length; index++) {
            str += 
            `<td><input type="checkbox" id="${result[index].option_value}" name="=${result[index].option_value}" onclick="subject(this.id)"><label
                    for="${result[index].option_value}">${result[index].option_value}</label></td>
            <td  id="${result[index].option_value}">`
            

           
   
        }
        let str2=`</td>
        </tr><hr>`
        str1+=str+str2;
       return str1;
    }

    if(type=="university"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr><td><label for="boardname">University Name:</label></td>
        <td><select name="university" id="university">` 

        for (let index = 0; index < result.length; index++) {
            str += 
            `<option>${result[index].option_value}</option>`
            

           
   
        }
        let str2=`</select></td>
        </tr><hr>`
        str1+=str+str2;
       return str1;
    }

   


    if(type=="course_name"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr id="course_detail">
        <td><label for="course_name">Name Of Course:- </label></td>
        <td>
            <select name="course_name" id="Course_Name">` 

        for (let index = 0; index < result.length; index++) {
            str += 
            `<option>${result[index].option_value}</option>`
            

           
   
        }
        let str2=`</select></td>
        </tr><hr>`
        str1+=str+str2;
       return str1;
    }


    if(type=="college"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr id="college">
        <td><label for="college">Name Of College:- </label></td>
        <td>
            <select name="college" id="college">` 

        for (let index = 0; index < result.length; index++) {
            str += 
            `<option>${result[index].option_value}</option>`
            

           
   
        }
        let str2=`</select></td>
        </tr><hr>`
        str1+=str+str2;
       return str1;
    }

    else if(type=="multy"){
       
        const sel_query = `select * from option_master where select_master_id=${id} `;
        const result = await queryDb(sel_query);

        let str = "";
        
        let str1=`<tr id="college">
        <td><label for="college">Name Of College:- </label></td>
        <td>
            <select name="college" id="college" multiple>` 

        for (let index = 0; index < result.length; index++) {
            str += 
            `<option>${result[index].option_value}</option>`
            

           
   
        }
        let str2=`</select></td>
        </tr><hr>`
        str1+=str+str2;
       return str1;
    }



}    
        
   
        
        
      let a=await dynamic_control(2,"state");
       let b= await dynamic_control(9,"gender");
       let c= await dynamic_control(1,"relation_status");
       let d= await dynamic_control(10,"subject");
       let e= await dynamic_control(4,"university");
       let f= await dynamic_control(3,"course_name");
       let g= await dynamic_control(11,"college");
       let h= await dynamic_control(11,"multy");


       res.render('combo.ejs', { a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h});
    });
    
app.listen(port);

{/* <select onchange="getcities(this.value)" name="state" id="state" > 
                        <option value=""></option>
                        <%for(let i=0;i<state.length ;i++){%>
                            <option value="<%=state[i]["option_value"]%>"><%=state[i]["option_value"] %></option>
                   <%}%> */}