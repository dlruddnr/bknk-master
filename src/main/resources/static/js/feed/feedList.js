const feedContainerElem=document.querySelector('#feedContainer');
const pagingContainerElem=document.querySelector('#pagingContainer')
const globalConstElem=document.querySelector('#globalConst')
var iuser=globalConstElem.dataset.iuser
const feedListObj={
    limit:9,
    page:1,
    url:'',
    type:0,
    makeFeedList: function(e){
        feedContainerElem.innerHTML=''
        // feedContainerElem.innerHTML=`<div id="container1"></div>
        //                              <div id="container2"></div>
        //                              <div id="container3"></div>`
        fetch(`${feedListObj.url}?limit=${feedListObj.limit}&page=${feedListObj.page}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)

                for(var i=0; i<myJson.length;i++){
                    var item=myJson[i]
                    var container;
                    // if(i<3){
                    //     container=feedContainerElem.firstChild
                    // }else if(i<6){
                    //     container=feedContainerElem.children[1]
                    // }else{
                    //     container=feedContainerElem.lastChild
                    // }

                    const ATAG=document.createElement('a')
                    const SPANTAG=document.createElement('span')
                    const IMGTAG=document.createElement('img')
                    const TITLE=document.createElement('span')

                    IMGTAG.src=`/pic/post/${item.iboard}/${item.img_addr}`
                    IMGTAG.onerror=function(){this.src='/img/spring.jpg'}

                    TITLE.innerText=item.title

                    SPANTAG.append(IMGTAG)
                    SPANTAG.append(TITLE)
                    ATAG.append(SPANTAG)
                    ATAG.href=`/b/reg?iboard=${item.iboard}`

                    // container.append(ATAG)
                    feedContainerElem.append(ATAG)
                }

            })
    },

    getFeedPage : function (){
        fetch(`/b/myfeedpage?limit=${feedListObj.limit}&type=${feedListObj.type}`)
            .then(res => res.json())
            .then(myJson => {

                for(var i=1; i<=myJson;i++){
                    const ATAG=document.createElement('a')
                    ATAG.innerText=i
                    ATAG.addEventListener('click',function(e){
                        feedListObj.page=e.target.innerText
                        console.log(feedListObj.page)
                        feedListObj.makeFeedList()
                    })
                    pagingContainerElem.append(ATAG)
                }
            })
    }
}



