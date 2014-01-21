---
layout: post
title:  "Rails + Angular: Structure"
date:   2014-01-18 07:30:52
categories: jekyll update
---

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight ruby linenos=table %}
class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::StrongParameters

  include Authentication
  include Authorization

  before_filter :authenticate_user_from_token!
  before_filter :requires_admin
  before_filter :set_current_buyer

  rescue_from ActiveRecord::RecordNotFound do |exception|
    not_found
  end
 
  private

  def set_pagination_headers_for(resource)
    response.headers["X-Page"] = resource.current_page.to_s
    response.headers["X-Per-Page"] = resource.per_page.to_s
    response.headers["X-Count"] = resource.total_entries.to_s
  end  

  def unauthorized
    render nothing: true, status: :unauthorized
  end

  def not_found
    render nothing: true, status: :not_found
  end

end
{% endhighlight %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus mattis est, eget rhoncus purus tempus at. Donec ac diam nec eros congue malesuada. Fusce in sagittis nisl, non pretium ipsum. Aliquam ultrices, enim id cursus vestibulum, turpis turpis mollis nisl, quis rhoncus velit nibh a sem. Fusce molestie non quam sit amet pulvinar. Aliquam lacinia sapien sed bibendum suscipit. In hac habitasse platea dictumst. Duis pulvinar eleifend turpis, sit amet elementum tortor viverra eget. Aenean sit amet velit pellentesque, ultrices nisi vitae, condimentum risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam eget justo viverra, posuere ante non, pellentesque turpis. Integer id scelerisque nibh. Etiam imperdiet vitae nisi at consequat.

Curabitur scelerisque eu quam in euismod. Nam vitae ante vel nulla suscipit suscipit. In arcu nunc, sagittis quis arcu nec, pretium aliquam dolor. Phasellus risus orci, commodo eget sollicitudin at, elementum quis sem. Vivamus sed viverra ipsum, vel tempor leo. Sed elit ante, mattis quis fermentum quis, convallis vitae felis. Maecenas varius blandit turpis, id dapibus dui convallis et.

{% highlight coffeescript linenos=table %}
 
    #Admin routes
    .state( 'admin', {
      abstract: true
      url: '/admin'
      templateUrl: 'views/admin/index.html'
      resolve: { user: ['Restangular', '$rootScope', (Restangular, $rootScope) ->
                          Restangular.one("users/me").get().then (user) ->
                            $rootScope.user = user
                        ]
                }
    })

  Restangular.setErrorInterceptor (response) ->
    if response.status == 304
      console.log('304 hit error handler....why?')
      return true

    $state.go 'login'
    false
{% endhighlight %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus mattis est, eget rhoncus purus tempus at. Donec ac diam nec eros congue malesuada. Fusce in sagittis nisl, non pretium ipsum. Aliquam ultrices, enim id cursus vestibulum, turpis turpis mollis nisl, quis rhoncus velit nibh a sem. Fusce molestie non quam sit amet pulvinar. Aliquam lacinia sapien sed bibendum suscipit. In hac habitasse platea dictumst. Duis pulvinar eleifend turpis, sit amet elementum tortor viverra eget. Aenean sit amet velit pellentesque, ultrices nisi vitae, condimentum risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam eget justo viverra, posuere ante non, pellentesque turpis. Integer id scelerisque nibh. Etiam imperdiet vitae nisi at consequat.

Curabitur scelerisque eu quam in euismod. Nam vitae ante vel nulla suscipit suscipit. In arcu nunc, sagittis quis arcu nec, pretium aliquam dolor. Phasellus risus orci, commodo eget sollicitudin at, elementum quis sem. Vivamus sed viverra ipsum, vel tempor leo. Sed elit ante, mattis quis fermentum quis, convallis vitae felis. Maecenas varius blandit turpis, id dapibus dui convallis et.

###Backend

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus mattis est, eget rhoncus purus tempus at. Donec ac diam nec eros congue malesuada. Fusce in sagittis nisl, non pretium ipsum. Aliquam ultrices, enim id cursus vestibulum, turpis turpis mollis nisl, quis rhoncus velit nibh a sem. Fusce molestie non quam sit amet pulvinar. Aliquam lacinia sapien sed bibendum suscipit. In hac habitasse platea dictumst. Duis pulvinar eleifend turpis, sit amet elementum tortor viverra eget. Aenean sit amet velit pellentesque, ultrices nisi vitae, condimentum risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam eget justo viverra, posuere ante non, pellentesque turpis. Integer id scelerisque nibh. Etiam imperdiet vitae nisi at consequat.

Curabitur scelerisque eu quam in euismod. Nam vitae ante vel nulla suscipit suscipit. In arcu nunc, sagittis quis arcu nec, pretium aliquam dolor. Phasellus risus orci, commodo eget sollicitudin at, elementum quis sem. Vivamus sed viverra ipsum, vel tempor leo. Sed elit ante, mattis quis fermentum quis, convallis vitae felis. Maecenas varius blandit turpis, id dapibus dui convallis et.

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
