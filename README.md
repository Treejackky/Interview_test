รายละเอียด 
วิธีการ setup 
1. อัปโหลดขึ้น git hub
2. ทำการอัปโหลดบนเว็ปไซต์ผ่าน vercel

วิธีการรัน 
เข้าเว็ปไซต์ https://xogame-cyan.vercel.app/

algorithm ที่ใช้งาน 
1. สร้าง function ขึ้นมาเพื่อเช็คทุกครั้งที่ทำการวาง x or o ด้วยการ for loop board ณ ปัจจุบัน เช็ค row, column, column แทยงมุมซ้าย, column แทยงมุมขวา loop
2. หากมีแนวที่วางครบจำนวน len ของ for อันนึงให้ break แล้วชนะทันที เช่น [[O,O,O],[...],[...]] ,[[O,'',''],[O,'',''],[O,'','']] ,[[O,'',''],['','',O,],['','',O]], [['','',O],['','',O],[O,'','']]  จะให้ชนะเลย
3. หาก lenght ของค่า x or o  ไม่มีตัวไหนที่ loop เช็๋คเจอ(lenght x or o เท่ากับ lenght ของ board) จะเปลี่ยนสถานะเข้าเงื่อนไข else เป็น draw = 1 จากเดิมเป็น O แล้ว set winner = 1
4. หากได้ผลลัพธ์แล้ว จะทำการเด้ง pop up เพื่อทำการ save, restart,
     4.1 เลือก save จำทำการยิง api ไปที่หลังบ้านเพื่อทำการสร้างข้อมูลของ board ที่เราเล่น (link backend: https://github.com/Treejackky/CCC_back)
     4.2 ถ้ากด restart จะทำการ init ค่าใหม่
5. เลือก history จะทำการ fecth ข้อมูล board ที่เราได้ทำการบันทึกไปก่อนหน้า
