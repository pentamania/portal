<gallery>
  <h2 class="p-heading">{opts.heading}</h2>
  <ul class="p-flex-gallery">
    <li each={item, i in opts.items} class="t-green">
      <a href="{item.url}" target="_blank">
        <div class="image-wrapper">
          <img src="{item.imagepath ? item.imagepath : NO_IMG_SRC}" alt="{item.name}">
        </div>
        <div class="title">{item.name}</div>
      </a>
      <div if="{item.descriptions}" class="descriptions">{item.descriptions}</div>
    </li>
  </ul>

  <script type="text/javascript">
    this.NO_IMG_SRC = './assets/images/works-thumbnail/no-image-kun.png';
  </script>

  <style scoped>
    :scope {
    }
    .title{
      font-size: 1.1rem;
      margin-top: .3rem;
    }
    .descriptions {
      padding: .5rem;
      font-size: .7rem;
      line-height: 1rem;
    }
    .image-wrapper {
      width: 100%;
      max-width: 170px;
      /*height: 150px;*/
      margin: 0 auto;
    }
    .image-wrapper img {
      width: 100%;
      height: auto;
      border: 1px solid white;
    }
  </style>
</gallery>


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
