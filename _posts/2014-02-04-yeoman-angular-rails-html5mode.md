---
layout: post
title: angular html5mode routing with yeoman and rails
---

When using Angular's HTML5 location mode you need to find a way to serve `index.html` even when the GET request hits a deep link. e.g. a direct request to `/products/35` needs to return the contents of `index.html` in order to fire up your angular app. Perhaps my google-fu was weak yesterday but I couldn't find any great examples of doing this when using yeoman and rails.


###yeoman/grunt

There are a few things to deal with here, the first is adding the rewriting.

I'm using [connect-modrewrite](https://github.com/tinganho/connect-modrewrite) for the url rewriting, lets install it first, in your angular app's directory:

{% highlight bash %}
$ npm install connect-modrewrite --save
{% endhighlight %}

Then in your Gruntfile, add the modrewrite middleware. You may or may not have a middleware section already, I've included a snipit that has the full middleware function in case you don't have one. It also includes a proxy for api calls to the rails server. The modrewrite bit is line 19.

{% highlight javascript linenos %}
livereload: {
  options: {
    open: true,
    base: [
      '.tmp',
      '<%= yeoman.app %>'
    ],
    middleware: function (connect, options) {
      var middlewares = [];
      var directory = options.directory || options.base[options.base.length - 1];
      if (!Array.isArray(options.base)) {
        options.base = [options.base];
      }

      // Setup the proxy to the rails backend for api calls
      middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

      //enable modrewrite for html5mode
      middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']));

      options.base.forEach(function(base) {
        // Serve static files.
        middlewares.push(connect.static(base));
      });

      // Make directory browse-able.
      middlewares.push(connect.directory(directory));

      return middlewares;
    }
  }
},
{% endhighlight %}

This tells the grunt server to rewrite any url that doesn't contain a `.` to request `/index.html`. 

The theory here is that all your static assets: css, js, images, fonts, etc contain `.`, your deep routes shouldn't. e.g. `/products/54/tags` has no `.` but `/scripts/controllers/products.js` does have a `.`.

It's also important that your proxy is before the rewrite in the middleware stack as your api urls probably don't contain `.` and would be rewritten if the proxy were after the rewrite.

There are a few other things that have to be fixed. Yeoman's default configuration for `bower-install` and `usemin` produce `link` and `script` tags with relative paths for `href`. 

For example, take a look at your `index.html` file

{% highlight html %}
<!-- build:css styles/vendor.css -->
<!-- bower:css -->
<link rel="stylesheet" href="bower_components/select2/select2.css" />
<link rel="stylesheet" href="bower_components/angular-loading-bar/src/loading-bar.css" />
<!-- endbower -->
<!-- endbuild -->
{% endhighlight %}

`bower-install` is creating these link tags for you and usemin will process them into something like:

{% highlight html %}
<link rel="stylesheet" href="styles/vendor.css">
{% endhighlight %}

The problem here is that the links are relative, when `index.html` is served from the root of the server, that isn't a problem. But, when `index.html` is served from a deep link, the relative path is wrong.

`GET /products/35` <- returns index.html contents

`href="styles/vendor.css"` now tries `GET /products/35/styles/vendor.css`

To fix this you need to make the path absolute, which in this example just means adding a `/` in front of the urls.

For `bower-install` open up your Gruntfile and find this section:

{% highlight javascript %}
'bower-install': {
  app: {
    html: '<%= yeoman.app %>/index.html',
    ignorePath: '<%= yeoman.app %>/'
  }
},
{% endhighlight %}

And remove the trailing `/` from the `ignorePath`:

{% highlight javascript %}
'bower-install': {
  app: {
    html: '<%= yeoman.app %>/index.html',
    ignorePath: '<%= yeoman.app %>'
  }
},
{% endhighlight %}

For usemin, find all the usemin build comments in your `index.html` file and add a leading `/` to the output file name, for example:

`<!-- build:css styles/vendor.css -->` becomes `<!-- build:css /styles/vendor.css -->`

You should also add leading slashes to anything you've added to `index.html` like your controllers, services, and directives scripts.

Finally, you need to add leading slashes to the `es5-shim.js` and `json3.min.js` conditional imports yeoman generates. 

###rails

This assumes your using yeoman to build your files into the rails public directory such that rails is serving them. I take this approach for simple deployment of the full app to Heroku, you can setup a CDN in front of these assets for production use.

Since you can't do url rewriting in front of the rails app with heroku, your stuck doing it somewhere in the rails stack. I'm using [rake-rewrite](https://github.com/jtrupiano/rack-rewrite) for this.

Add `gem 'rake-rewrite'` to your Gemfile and `bundle install`.

In `Application.rb` add the middleware, depending on what your `Application.rb` already looks like, it'll end up something like this:

{% highlight ruby %}
module YourApp
  class Application < Rails::Application
    config.serve_static_assets = true

    config.middleware.insert_before ActionDispatch::Static, Rack::Rewrite do
      rewrite %r{^(?!/api/).*}, '/index.html', :not => %r{(.*\..*)}
    end
  end
end
{% endhighlight %}

The middleware is being inserted before the static file server and the rewrite rule is says: If the url doesn't start with '/api/' rewrite to '/index.html' unless the url contains a `.`.

You may have to tweak this a bit for your environment, I serve my api endpoints from '/api/v{x}' so I'm excluding anything that starts with '/api/' from the rewrite. I'm also using the same `.` logic used in the grunt rewriting. 

Hope this helps!



   