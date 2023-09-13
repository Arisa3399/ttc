today=new Date();
Y=today.getFullYear();
M=today.getMonth();
D=today.getDate();
lmDate=new Date(document.lastModified);
lmY=lmDate.getFullYear();
lmM=lmDate.getMonth()+1;
lmD=lmDate.getDate();
document.write("最終更新日：",lmY,"年",lmM,"月",lmD,"日");
