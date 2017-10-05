I want to emit all dependencies into single directory per entry.

### expected webpack result:

```
dest/
+- a/
|  +- a.bundle.js
|  +- a.css
|  +- a/
|     +- tarot.jpg
+- b/
   +- b.bundle.js
   +- b.css
   +- b/
      +- tarot.jpg
```

=> actually

### expected a.css:

```
body {
    background-image: url(a/tarot.jpg);
}
```

=> actually

### expected b.css:

```
body {
    background-image: url(b/tarot.jpg);
}
```

but actual:

```
body {
    background-image: url(a/tarot.jpg);
}
```

`url(a/...)`, but I expected `url(b/...)`.