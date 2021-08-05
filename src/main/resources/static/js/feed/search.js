const feedContainerElem=document.querySelector('#feedContainer');
const pagingContainerElem=document.querySelector('#pagingContainer')
const searchDataElem=document.querySelector('#searchData')

const feedListObj={
    searchType:0,
    searchWord:'',
    limit:9,
    page:1,
    url:'',
    makeFeedList: function(e){
        feedContainerElem.innerHTML=`<div id="container1"></div>
                                     <div id="container2"></div>
                                     <div id="container3"></div>`
        fetch(`${feedListObj.url}?searchType=${feedListObj.searchType}&searchWord=${feedListObj.searchWord}&limit=${feedListObj.limit}&page=${feedListObj.page}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)

                for(var i=0; i<myJson.length;i++){
                    var item=myJson[i]
                    var container;
                    if(i<3){
                        container=feedContainerElem.firstChild
                    }else if(i<6){
                        container=feedContainerElem.children[1]
                    }else{
                        container=feedContainerElem.lastChild
                    }

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
                    ATAG.href=`/map/detail?iboard=${item.iboard}`

                    container.append(ATAG)
                }

            })
    },

    getFeedPage : function (){
        fetch(`/b/searchPage?limit=${feedListObj.limit}&searchType=${feedListObj.searchType}&searchWord=${feedListObj.searchWord}`)
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


feedListObj.url='/b/feedlist'
feedListObj.searchType=searchDataElem.dataset.searchType
feedListObj.searchWord=searchDataElem.dataset.searchWord
feedListObj.getFeedPage()
feedListObj.makeFeedList()



