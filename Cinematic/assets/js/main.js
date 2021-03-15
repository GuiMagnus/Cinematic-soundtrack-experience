/**
* Template Name: TheEvent - v4.0.1
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function(event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function consultaFilme() {
  filme = document.getElementById('pesquisaFilme');
  filme.value.replace(' ','%20');  
  $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?s="+filme.value+"&page=1&r=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3112e86d84mshd5bddc1a3846505p16c3f8jsn26a7a23e2005",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        
        },
        success: function(resposta) {  
           
            if(resposta.Response=="False")
              alert("Film not Found! Verify the name and try Again!");
            else
              idFilme = resposta.Search[0].imdbID;
              segundaReq(idFilme,filme); 
        }
    });
}  

function segundaReq(idFilme,filme){
     $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?i="+idFilme+"&r=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3112e86d84mshd5bddc1a3846505p16c3f8jsn26a7a23e2005",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        
        },
        success: function(resp) {  
            
             $("#sinopse").html(resp.Plot),
             atores = resp.Actors.split(",");
             $("#nomeDoFilme").html(resp.Title),
             $("#ator1").html(atores[0]),
             $("#ator2").html(atores[1]),
             $("#ator3").html(atores[2]),
             $("#ator4").html(atores[3]),
             $("#diretor").html(resp.Director),
             $("#genero").html(resp.Genre),
             $("#produtora").html(resp.Production),
             $("#dataLancamento").html(resp.Released),
             $("#duracaoFilme").html(resp.Runtime),
             $("#idioma").html(resp.Language),
             $("#metacritica").html(resp.Metascore),
             //Second Page
             $("#ratingIMDB").html(resp.imdbRating),
             $("#votesIMDB").html(resp.imdbVotes),
             $("#bilheteria").html(resp.BoxOffice),
             $("#premiacao").html(resp.Awards),
             //Third Page
             $("#posterFilme").attr("src",resp.Poster);
             var imdb = resp.Ratings[0].Value;
             var rotten = resp.Ratings[1].Value;
             var meta = resp.Ratings[2].Value;
             $("#notaIMDB").html(imdb);
             $("#notaMeta").html(meta);
             $("#notaRotten").html(rotten);
             pesquisaPlaylist(filme);
             document.getElementById('pesquisaFilme').value = '';
         },
         error: function(){
            alert("Filme Não encontrado");
        }
    });
}

 function pesquisaPlaylist(nomeFilme){
    filme = nomeFilme.value.replace(" ","%20");
    const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://youtube-advanced-search.p.rapidapi.com/video/"+filme+"%20soundtrack",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "42c53c81a4msh33e481a0f334706p1850cfjsn09d35ede5ab8",
        "x-rapidapi-host": "youtube-advanced-search.p.rapidapi.com"
    }
};

$.ajax(settings).done(function (response) {
    var tagVideo1 = response.Data[0].video_id;
    var tagVideo2 = response.Data[1].video_id;
    var tagVideo3 = response.Data[2].video_id;
    var tagVideo4 = response.Data[3].video_id;
    
    $('#video1').attr("src", "https://www.youtube.com/embed/" + tagVideo1);
    $('#video2').attr("src", "https://www.youtube.com/embed/" + tagVideo2);
    $('#video3').attr("src", "https://www.youtube.com/embed/" + tagVideo3);
    $('#video4').attr("src", "https://www.youtube.com/embed/" + tagVideo4);
});
}