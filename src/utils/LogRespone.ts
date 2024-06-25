

const prettyPrint = (response:any) => {
    const green = '\x1b[32m';
    const yellow = '\x1b[33m';
    const red = '\x1b[31m'; // Màu đỏ
    const reset = '\x1b[0m';
    const cyan = '\x1b[36m'; // Màu cyan cho dấu ngoặc
  
    let importantData: any = {};
  
    if (response.status !== undefined) {
      importantData.status = response.status;
    }
  
    if (response.message !== undefined) {
      importantData.message = response.message;
    }
  
    importantData.data = response.data || response;
  
    const formatted = JSON.stringify(importantData, null, 2)
      .replace(/"([^"]+)":/g, `${green}"$1":${yellow}`) // Định dạng keys
      .replace(/: "([^"]+)"/g, `: ${green}"$1"${reset}`) // Định dạng values chuỗi
      .replace(/: (\d+)/g, `: ${green}$1${reset}`) // Định dạng values số
      .replace(/{/g, `${cyan}{${reset}`) // Định dạng dấu ngoặc mở
      .replace(/}/g, `${cyan}}${reset}`) // Định dạng dấu ngoặc đóng
      .replace(/"status": (\d+)/g, `${red}"status": $1${reset}`); // Định dạng cặp key-value của status
  
    console.log(formatted);
  };


  export const LogRespone = prettyPrint
