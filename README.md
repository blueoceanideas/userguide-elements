User Guide Elements
=======================

Forked From: [spoiler-alert](http://joshbuddy.github.io/spoiler-alert/)

Usage
=====

Add a few BBCodes that are useful in the LaRuta user guide.

Installation
============

* Add the plugin's repo url to your container's `app.yml` file

```yml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - mkdir -p plugins
          - git clone list/of/plugin/repos/here
          - git clone https://github.com/discourse/discourse-spoiler-alert.git
```

* Rebuild the container

```
cd /var/discourse
git pull
./launcher rebuild laruta-discourse-web-only
```

License
=======
MIT
