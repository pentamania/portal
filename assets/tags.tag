<link-list>
  <!--  <ul class="p-anchor-list t-green">  -->
  <ul class="p-anchor-list">
    <li each={item, key in opts.items}>
      <a href="{item.url}" target="_self">
        <span>{item.label ? item.label : key}</span>
      </a>
    </li>
  </ul>
</link-list>


<gallery>

  <!--  <h2 class="t-green">{opts.heading}</h2>  -->

  <ul class="p-flex-gallery">
    <li each={item, i in opts.items} class="nes-container is-rounded is-dark p-flex-gallery_item">
      <!--  <span>-{parent.opts.heading}-</span>  -->
      <a href="{item.url}" target="_blank">
        <div class="image-wrapper" if="{item.imagepath}">
          <img
            data-src="{item.imagepath}"
            alt="{item.name}"
            onload={onImageLoad}
            style="display: none"
          >
          <div ref="{'img_loader_'+i}" class="loader">Loading...</div>
        </div>
        <div class="title">{item.name}</div>
      </a>
      <div if="{item.descriptions}" class="description">{item.descriptions}</div>
    </li>
  </ul>

  <script type="text/javascript">
    var refs = this.refs;

    this.on('mount', function() {
      Array.prototype.forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
      })
    });

    this.onImageLoad = function(e) {
      var img = e.target;
      var loader = refs['img_loader_'+e.item.i];
      img.style.display = "inline";
      img.removeAttribute('data-src');
      loader.parentNode.removeChild(loader);
    }
  </script>

  <style scoped>
    .title {
      font-size: 1.1rem;
      margin-top: .3rem;
    }
    .description {
      padding: .5rem;
      font-size: .7rem;
      line-height: 1rem;
    }
    .image-wrapper {
      width: 100%;
      max-width: 160px;
      height: 160px;
      margin: 0 auto 1rem;
      /* centerize content */
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .image-wrapper img {
      width: 100%;
      height: auto;
      border: 1px solid white;
    }

    /* loader from https://projects.lukehaas.me/css-loaders/ */
    .loader {
      color: #ffffff;
      font-size: 16px;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      -webkit-animation: load4 1.3s infinite linear;
      animation: load4 1.3s infinite linear;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }
    @-webkit-keyframes load4 {
      0%,
      100% {
        box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
      }
      12.5% {
        box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      25% {
        box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      37.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      50% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      62.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
      }
      75% {
        box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
      }
      87.5% {
        box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
      }
    }
    @keyframes load4 {
      0%,
      100% {
        box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
      }
      12.5% {
        box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      25% {
        box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      37.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      50% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      62.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
      }
      75% {
        box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
      }
      87.5% {
        box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
      }
    }

  </style>
</gallery>

<!--  not used: remove later?  -->
<simple-gallery>
  <h2 class="p-heading">{opts.heading}</h2>
  <ul class="p-flex-gallery">
    <li each={item, i in opts.items} class="t-green">
      <a href="{item.url}" target="_blank">
        <div class="title">{item.name}</div>
      </a>
      <div if="{item.descriptions}" class="descriptions">{item.descriptions}</div>
    </li>
  </ul>

  <script type="text/javascript">
  </script>

  <style scoped>
    .title {
      font-size: 1.1rem;
      margin-top: .3rem;
    }
    .descriptions {
      padding: .5rem;
      font-size: .7rem;
      line-height: 1rem;
    }
  </style>
</simple-gallery>
