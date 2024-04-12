const con = require('./BaseModel');
class Signin{
    Session(mssv, password){
        return new Promise((resolve, reject) =>{
            try{
                con.query("SELECT * FROM THONGTINCANHAN WHERE MASO = '"+mssv+"' AND MATKHAU = '"+password+"'", function (err, result) {                   
                    if (err){
                        return reject(err);
                    }        
                    return resolve(result);
                });
            }
            catch(e){
                reject(e);
            }
        })    
    }
    async getGrade(maso){
        return new Promise((resolve, reject) =>{
            try{
                con.query("SELECT * FROM MONHOC, DIEM, THONGTINCANHAN WHERE MONHOC.MAMH=DIEM.MAMH AND THONGTINCANHAN.MASO=DIEM.MASO AND DIEM.THUCHANH = MONHOC.THUCHANH AND DIEM.MASO= '"+maso+"'", 
                function (err, result) {
                    if (err){
                        reject(err);
                        return; 
                    }        
                    return resolve(result)
                });
            }
            catch(e){
                reject(e)
            }
        })   
    }
    getRegistedList(maso){
        return new Promise((resolve, reject) =>{
            try{
                con.query("SELECT  * FROM MONHOC, DIEM, THONGTINCANHAN WHERE MONHOC.MAMH=DIEM.MAMH AND THONGTINCANHAN.MASO=DIEM.MASO AND DIEM.MASO= '"+maso+"' GROUP BY MONHOC.MAMH", 
                function (err, result) {
                    if (err){
                        reject(err);
                        return; 
                    }        
                    return resolve(result)
                });
            }
            catch(e){
                reject(e)
            }
        })    
    }
}
module.exports = new Signin;