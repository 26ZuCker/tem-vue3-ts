async function f1(urls){
    console.log("A")
    //并发
    /* let up=urls.map(url=>{
        new Promise((resolve)=>{
            console.log(url)
            setTimeout(() => {
                console.log(url+"A")
                resolve("BB")
            }, 1000);
        });
    })
    Promise.all(up).then(()=>{console.log("OK")}) */

    //并发
    /* urls.map(async url=>{
        await new Promise((resolve)=>{
            console.log(url)
            setTimeout(() => {
                console.log(url+"A")
                resolve("BB")
            }, 1000);
        });
    });
 */
    //继发，会阻碍函数内其它语句
    /* await new Promise((resolve)=>{
        console.log("BA")
        setTimeout(() => {
            console.log("B")
            resolve("BB")
        }, 500);
    });
    await new Promise((resolve)=>{
        console.log("CA")
        setTimeout(() => {
            console.log("C")
            resolve("CC")
        }, 500);
    }); */

    //继发,会阻碍函数内其它语句
    /* for(let url of urls){
        await new Promise((resolve)=>{
            console.log(url)
            setTimeout(() => {
                console.log(url+"A")
                resolve()
            }, 500);
        });
    } */

    //并发 for await of循环，不会阻碍函数内其它语句
    /* for await(const i of urls){
        new Promise((resolve)=>{
            console.log(i+"A")
            setTimeout(() => {
                console.log(i)
                resolve()
            }, 500);
        })
    } */
    console.log("E")
}
/* urls=["B","C","D"]
console.log("G")
f1(urls) */