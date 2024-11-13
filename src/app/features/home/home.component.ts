import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // List of script paths to be loaded, ensuring jQuery is first
    this.loadScripts([
      'https://code.jquery.com/jquery-3.5.1.js', // jQuery first
      'https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
      '/assets/main.js' 
    ]);
  }

  loadScripts(scripts: string[]): void {
    let index = 0;

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = scripts[index];
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        console.log(`Script loaded: ${scripts[index]}`);
        this.onScriptLoad(scripts[index]);

        // Load next script
        index++;
        if (index < scripts.length) {
          loadScript();
        }
      };

      document.body.appendChild(script);
    };

    // Start loading scripts
    loadScript();
  }

  onScriptLoad(scriptUrl: string): void {
    // Initialize any libraries here, if necessary, once the script is loaded
    if (scriptUrl.includes('slick.min.js')) {
      // Initialize Slick Carousel
      (window as any).$('.your-carousel').slick();
    }

    if (scriptUrl.includes('wow.min.js')) {
      // Initialize Wow.js
      new (window as any).WOW().init();
    }

    if (scriptUrl.includes('owl.carousel.min.js')) {
      // Initialize Owl Carousel
      (window as any).$('.owl-carousel').owlCarousel();
    }
  }

}
