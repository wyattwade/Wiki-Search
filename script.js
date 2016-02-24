$(document).ready(function() {
  
  var title
 
  var searchValue

  $('#searchInput').keyup(function() {

    searchValue = $('#searchInput').val();

    if (searchValue == 0){
      $('#resultContainer').empty();
    }  
    
       wikiSearch();
    
    
 //   if (searchValue.length > 5) {
 //  alert(searchValue)
 //    }

  });

//    alert('hi')
    function wikiSearch(){ 
  
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php?callback=?&action=query&list=search&format=json&srsearch='+searchValue,
       //vs http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=california
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
   //  alert('success')
        
         $('#resultContainer').empty();
        
       
        // for some reason .query.search allows me to bypass the first object and direct the .forEach to the second object which is an array.
       data.query.search.forEach(function(apiObject){
       
      // I'll need this when providing a link for the wiki page. For example https://en.wikipedia.org/wiki/California would be                              'https://en.wikipedia.org/wiki/' + title
       title = apiObject.title;
            
       var linkTitle = title.replace(/ /g,"_"); // do regex changing spaces to '_'

      
         
         $('#resultContainer').append(
                                     
                                      '<div id ="result">'
                                      +'<a href = "https://en.wikipedia.org/wiki/' + linkTitle + '" target="_blank">'
                                      +'<div class = "title">' + title + '</div>'
                                      +'<div class = "description">' + apiObject.snippet + '</div>'
                                      +'</div>')
            
          

         
         
       }); 
        
        
      

      }

    });
    }
  
  
  
  // random search
  $('#clearButton').click(function(){
    $('#resultContainer').empty();
  });
  
  $('#randomButton').click(function(){
    randomSearch();
    
  });
  
      function randomSearch(){ 
  
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php?callback=?&format=json&action=query&list=random&rnnamespace=0&rnlimit=10',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
   //  alert('success')
    // alert(data.query.search);
        
         $('#resultContainer').empty();
        
       
        
        // for some reason .query.search allows me to bypass the first object and direct the .forEach to the second object which is an array.
       data.query.random.forEach(function(apiObject){
       
       
      // I'll need this when providing a link for the wiki page. For example https://en.wikipedia.org/wiki/California would be                              'https://en.wikipedia.org/wiki/' + title
       title = apiObject.title;
            
       var linkTitle = title.replace(/ /g,"_"); // do regex changing spaces to '_'

      
         
         $('#resultContainer').append(
                                      '<a href = "https://en.wikipedia.org/wiki/' + linkTitle + '" target="_blank">'
                                      +'<div id ="result">'  
                                      +'<div class = "title">' + title + '</div>'         
                                      +'</div>')
       
            
          

         
         
       }); 
        
        
      

      }

    });
    }
  
  
  
  
  
  });
  // });