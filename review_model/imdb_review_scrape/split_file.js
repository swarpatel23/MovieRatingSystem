const fs = require('fs');
const csv = require('csv-parser');


function splitFile(name){                
    var count = 0;
    var nofile = 0;
    var dir = "multiple/";
    var fname,id;
    var fileloc = dir + fname;
    var writeStream;
    fs.createReadStream('BollywoodMovieDetail.csv')
    .pipe(csv())    
    .on('data', (row) => {                  
        if(count%200 ==0){  
            nofile++;
            fname = "file"+nofile+".csv";          
            fileloc = dir + fname;
            writeStream = fs.createWriteStream(fileloc);
            writeStream.write("id,name\n");                           
            console.log(count);
        }          
        id = row["imdbId"];
        title = row["title"];        
        writeStream.write(`${id},"${title}"\n`); 
        if(count%200==199){
            writeStream.close();
        }
        count++;
        // const writeStream = fs.createWriteStream(directory + filename);
        // writeStream.write("heading,review\n");   
        // writeStream.write(`"${heading}","${review}" \n`); 
        // writeStream.close();
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}
splitFile("BollywoodMovieDetail.csv");