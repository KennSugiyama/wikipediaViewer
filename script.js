$('document').ready(function(){

  $('form').on('submit', (e) => {
    e.preventDefault();
    getArticle($('#searchTerm').val())
  })

  function getArticle(searchTerm) {
    let endPoint = 'https://en.wikipedia.org/w/api.php?'
    let apiCall = 'action=opensearch&format=json&namespace=0&limit=10&search='
    let url = endPoint + apiCall + searchTerm

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(json){
        parse(json)
      }
    });

    function parse(json){
      var articles = [];
      for (let i = 0; i < json[1].length; i++){
        articles.push({
          title: json[1][i],
          description: json[2][i],
          link: json[3][i]
        })
      };
      display(articles);
    }

    function display(articles){
      for(let i = 0; i < articles.length; i++){
        let html = `<div class="entry">
                      <a href=${articles[i].link} target='_blank'>
                      <h2>${articles[i].title} </h2>
                      <p> ${articles[i].description} </p></a>`
        $('#searchResults').append(html)
      }
    }
  }

})//document ready