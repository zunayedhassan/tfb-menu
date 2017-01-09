tfb-menu
========

Responsive Menu for Websites

![Screenshot](https://raw.githubusercontent.com/zunayedhassan/tfb-menu/master/screenshot.png)


##Usage

```html
<link rel="stylesheet" type="text/css" media="all" href="css/tfb-menu-style.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/tfb-menu-theme.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/icomoon.css" />

<!-- External script -->

<script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>



<!-- tfb-menu -->

<script type="text/javascript" src="js/tfb-menu-script.js"></script>

<script type="text/javascript">

    jQuery(document).ready(function() {

        TfbMenu('#my-menu');    // Optional parameter TfbMenu('#my-menu', false, false);

    });

</script>
```

```html
<nav>
    <!-- This list will be our menu -->
    <ul id="my-menu">
        <li>
            <a href="#">Menu Item 1</a>
        </li>

        <li>
            <a href="#">Menu Item 2</a>

            <ul>
                <li>
                    <a href="#">Submenu Item 1</a>
                </li>

                <li>
                    <a href="#">Submenu Item 2</a>
                </li>

                <li>
                    <a href="#">Submenu Item 3</a>
                </li>

                <li>
                    <a href="#">Submenu Item 4</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="#">Menu Item 3</a>

            <ul>
                <li>
                    <a href="#">Submenu Item 1</a>
                </li>

                <li>
                    <a href="#">Submenu Item 2</a>

                    <ul>
                        <li>
                            <a href="#">Level 3 Item 1</a>
                        </li>

                        <li>
                            <a href="#">Level 3 Item 2</a>

                            <ul>
                                <li>
                                    <a href="#">Level 4 Item 1</a>
                                </li>

                                <li>
                                    <a href="#">Level 4 Item 2</a>
                                </li>

                                <li>
                                    <a href="#">Level 4 Item 3</a>
                                </li>

                                <li>
                                    <a href="#">Level 4 Item 4</a>

                                    <ul>
                                        <li>
                                            <a href="#">Level 5 Item 1</a>
                                        </li>

                                        <li>
                                            <a href="#">Level 5 Item 2</a>
                                        </li>

                                        <li>
                                            <a href="#">Level 5 Item 3</a>

                                            <ul>
                                                <li>
                                                    <a href="#">Level 6 Item 1</a>
                                                </li>

                                                <li>
                                                    <a href="#">Level 6 Item 2</a>
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <a href="#">Level 5 Item 4</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Level 3 Item 3</a>
                        </li>

                        <li>
                            <a href="#">Level 3 Item 4</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#">Submenu Item 3</a>
                </li>

                <li>
                    <a href="#">Submenu Item 4</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="#">Menu Item 4</a>
        </li>

        <li>
            <a href="#">Menu Item 5</a>
        </li>

        <li>
            <a href="#">Menu Item 6</a>

            <ul>
                <li>
                    <a href="#">Level 2 Item 1</a>
                </li>

                <li>
                    <a href="#">Level 2 Item 2</a>
                </li>
            </ul>
        </li>
    </ul>
</nav>
```
