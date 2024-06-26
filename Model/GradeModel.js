const con = require('./BaseModel');
class GradeModel{
    getCurrentday(){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        const day = currentDate.getDate();
        return year+"-"+month+"-"+day;
    }
    async getSemester(){
        const currentDate = this.getCurrentday();
        return new Promise((resolve, reject) =>{
            try{
                con.query("SELECT * FROM NIENKHOAHOCKY WHERE '"+currentDate+"' BETWEEN TGBATDAU AND TGKETTHUC ", function (err, result) {
                    if (err){
                        return reject(err)
                    }      
                    return resolve(result[0])       //Lấy ra 1 học kỳ
                });
            }
            catch(e){
                reject(e)
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


    async getList(){
        return new Promise((resolve, reject) =>{
            try{
                con.query("SELECT * FROM MONHOC, DIEM, THONGTINCANHAN WHERE MONHOC.MAMH=DIEM.MAMH AND THONGTINCANHAN.MASO=DIEM.MASO AND DIEM.THUCHANH = MONHOC.THUCHANH ", 
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


    async Update(subject_id, student_id, mid10, exam10, final10, final4, ranking, result){
        return new Promise((resolve, reject) =>{
            try{
                con.query("UPDATE DIEM SET DIEMQUATRINH10='"+mid10+"', DIEMCUOIKY10='"+exam10+"', DIEMTONGKET10='"+final10+"', DIEMTONGKET4='"+final4+"', XEPLOAI='"+ranking+"', KETQUA='"+result+"'"+
                " WHERE MAMH='"+subject_id+"' AND MASO='"+student_id+"'",
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
module.exports = new GradeModel;