function setOption(){
    feedListObj.url=`/b/hotList?limit=${feedListObj.limit}&page=${feedListObj.page}`
}
setOption()
feedListObj.makeFeedList()
