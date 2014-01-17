/*
 *  TFB MENU
 *  VERSION:    1.0
 *  
 *  AUTHOR:     Mohammod Zunayed Hassan
 *  EMAIL:      ZunayedHassanBD@gmail.com
 *  
 */

/*
 * CLASS NAME:  TfbMenu
 * 
 * @param {string} selector
 * @param {boolean} collapseAllSubmenuInSmallerScreen
 * @param {boolean} changeIconWhenSubMenuExpandsInSmallerScreen
 * @param {int} breakingPoint
 * @param {string} mobileMenuIcon
 * @param {string} wideScreenMainMenuItemIcon
 * @param {string} wideScreenSubMenuIcon
 * @param {string} smallScreenCollapsedMenuIcon
 * @param {string} smallScreenExpandedMenuIcon
 * 
 * PURPOSE:     To make a responsive menu
 * 
 * USAGE:       1.  on header add,
 *                  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
 *                  
 *                  <link rel="stylesheet" type="text/css" media="all" href="css/tfb-menu-style.css" />
 *                  <link rel="stylesheet" type="text/css" media="all" href="css/tfb-menu-theme.css" />
 *                  
 *                  and add this for icons
 *                  <link rel="stylesheet" type="text/css" media="all" href="css/icomoon.css" />
 *                  
 *              2.  Now on body after list is loaded, then add
 *                  jQuery: for example <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
 *                  tfb-menu-script     <script type="text/javascript" src="js/tfb-menu-script.js"></script>
 *                  
 *              3.  Now, every resource is loaded, its time to call our menu
 *                  <script type="text/javascript">
 *                      jQuery(document).ready(function() {
 *                          TfbMenu('#my-menu');
 *                      }
 *                  </script>
 *                  
 *              4.  If you want to change color scheme of menu, then change on tfb-menu-theme.css file or use other javascript method.
 *              
 *              5.  Remember, if you wan to change the 'breakingPoint' variable value by passing on parameter, it will work fine,
 *                  but you will also need to change on both tfb-menu-style.css and tfb-menu-theme.css file. Otherwise, the theme
 *                  will look broken.
 */
function TfbMenu(selector, collapseAllSubmenuInSmallerScreen, changeIconWhenSubMenuExpandsInSmallerScreen, breakingPoint, mobileMenuIcon, wideScreenMainMenuItemIcon, wideScreenSubMenuIcon, smallScreenCollapsedMenuIcon, smallScreenExpandedMenuIcon) {

    // Default Values for setting
    collapseAllSubmenuInSmallerScreen = (typeof collapseAllSubmenuInSmallerScreen !== 'undefined') ? collapseAllSubmenuInSmallerScreen : false;
    changeIconWhenSubMenuExpandsInSmallerScreen = (typeof changeIconWhenSubMenuExpandsInSmallerScreen !== 'undefined') ? changeIconWhenSubMenuExpandsInSmallerScreen : true;
    breakingPoint                = (typeof breakingPoint                !== 'undefined') ? breakingPoint                : 641;
    mobileMenuIcon               = (typeof mobileMenuIcon               !== 'undefined') ? mobileMenuIcon               : 'icon-menu2';
    wideScreenMainMenuItemIcon   = (typeof wideScreenMainMenuItemIcon   !== 'undefined') ? wideScreenMainMenuItemIcon   : 'icon-dot';
    wideScreenSubMenuIcon        = (typeof wideScreenSubMenuIcon        !== 'undefined') ? wideScreenSubMenuIcon        : 'icon-uniE91B';
    smallScreenCollapsedMenuIcon = (typeof smallScreenCollapsedMenuIcon !== 'undefined') ? smallScreenCollapsedMenuIcon : 'icon-arrow-down10';
    smallScreenExpandedMenuIcon  = (typeof smallScreenExpandedMenuIcon  !== 'undefined') ? smallScreenExpandedMenuIcon  : 'icon-arrow-up9';

    // Declaring some private variables
    var _isAlreadyWide           = false;
    var _isTfbMenuAlreadyResized = false;
    var _currentWidth            = jQuery(window).width();

    // Constructor started

    // Constructing our menu
    jQuery(selector).addClass('tfb-menu');
    
    // Making list style invisible, for Internet Explorer
    jQuery('.tfb-menu li').css('list-style', 'none');

    // Adding mobile menu button
    jQuery('.tfb-menu').before('<button class="tfb-mobile-menu-button"><span class="' + mobileMenuIcon + '"></span></button>');

    // If mobile menu button clicked, it will show/hide the menu
    jQuery('.tfb-mobile-menu-button').on('click', function() {
            jQuery('.tfb-mobile-menu-button').next('.tfb-menu').slideToggle();
    });

    // Constructing menu from unordered list
    // Checking if menu item contains any submenu. If it does then label that link as tfb-menu-parent
    jQuery('.tfb-menu li').has('ul').addClass('tfb-menu-parent');

    // Add space for inserting icon to those tfb-menu-parents.
    // In widescreen display, there will be two types of icons for sub menu. Those who are directly descendent of main menu will contains drop menu icon. The rest of the sub menus of those sub menus will cotain right arrow head icons. ALthough, if screen size is smaller like phone, then we we add down arrow for both places

    // For sub menu of main menus are now labeled as tfb-menu-submenu
    jQuery('.tfb-menu > .tfb-menu-parent .tfb-menu-parent > a').each(function() {
        var anchorInnerHTML = jQuery(this).html();
        jQuery(this).html('<div>' + anchorInnerHTML + '</div><div><span class="tfb-menu-submenu"></span></div>');
    });

    // For sub menu of main menu are now labeled as tfb-menu-item
    jQuery('.tfb-menu > .tfb-menu-parent > a').each(function() {
        var anchorInnerHTML = jQuery(this).html();
        jQuery(this).html('<div>' + anchorInnerHTML + '</div><div><span class="tfb-menu-item"></span></div>');
    });

    // When menu initialize for the first time,
    // checking scrren width to find that, is it already wide screen, or small screen
    if (_currentWidth >= breakingPoint) {
        _isAlreadyWide = true;
    }
    else {
        _isAlreadyWide = false;
    }

    // Hiding all the sub menus
    jQuery('.tfb-menu ul').hide();

    // Now finally loading our menu
    adjustMenu();

    // But if user changes the screen size or orientation of the device, then adjust the whole menu again
    // To do that, we are adding an event handler and keep tracking of sizes whenever it changes and then at last based on that, adjusting the menu
    jQuery(window).bind('resize orientationchange', function() {
        _currentWidth = jQuery(window).width();
        adjustMenu();
    });

    // Constructor ended

    /*
     * METHOD NAME: adjustMenu
     * PARAMETER:   None 
     * RETURN:      None
     * 
     * PURPOSE:     Adjust menu behavour, even when screen size is changed
     */
    function adjustMenu() {
        // Why this condition is for?
        // Well, this adjustMenu method will be called not only when menu is initialzed for the first time, but also every time when screen size is also changed. So, every time for each and every single pixel is changed, this method is suppossed to call and there are lot of things going on within this method. But for our calculation, we don't need to call this method everytime. We just need to call this method when scrren size is smaller than the breaking point (641px by default) or larger than breaking point. So, to avoid that huge amount of process in the rest of the method, this conditions comes in.

        // If this is wide screen but no changes has made yet or menu is just trying to initialiezed for the first time then made the chages for wide screen and remember that for this wide type of screen, until screen size changed to small screen.
        if ((!_isAlreadyWide && (_currentWidth >= breakingPoint)) || (!_isTfbMenuAlreadyResized && (_currentWidth >= breakingPoint) && _isAlreadyWide)) {
            // Just in case if user were in small screen and uses mobile menu button to hide this menu entirly and then he changed his screen size t wide, then in that case he might not find the menu, because its already hidden by the mobile menu button. But this is a wide screen, which means menu must be showed.

            // So, if menu isn't visible but, screen size is wide, then make visible the menu.
            if (!jQuery('.tfb-menu').is(':visible') && (_currentWidth > breakingPoint)) {
                jQuery('.tfb-menu').show();
            }

            // Just remember that, this menu is already resized
            _isTfbMenuAlreadyResized = true;

            // Hide all the sub ordinate menu of main menu
            jQuery('.tfb-menu li ul').hide();

            // If menu is resized from small screen then, forget all the click events that they were there.
            jQuery('.tfb-menu li').unbind('click');

            // Attach mouse hover event, which means if user put his mouse on to the menu, and if that menu/sub menu contains more sub menus, then show those menus. If user leaves his mouse, then hide those sub menus.
            jQuery('.tfb-menu li')
                .bind('mouseenter', function() {
                    jQuery(this).addClass('hover');

                    // Animation when mouse entered
                    var revealItem = jQuery(this).children('ul');
                    jQuery(revealItem).fadeIn();
                })
                .bind('mouseleave', function() {
                    jQuery(this).removeClass('hover');

                    // Animation when mouse left
                    var hideItem = jQuery(this).children('ul');
                    hideItem.fadeOut();
                });


            // We have created some space for those menu items which has sub menus. To give user a idea of that, we are adding appropriate icons
            // Just in case, if user came from smaller screen, then remove those drop icons
            jQuery('.tfb-menu-submenu').removeClass(smallScreenCollapsedMenuIcon);
            jQuery('.tfb-menu-item').removeClass(smallScreenCollapsedMenuIcon);

            // This is a wide screen.
            // For sub menu which has more sub menu, add down faced arrow icon
            jQuery('.tfb-menu-submenu').addClass(wideScreenSubMenuIcon);

            // For main menu which has sub menu, add right faced arrowe icon
            jQuery('.tfb-menu-item').addClass(wideScreenMainMenuItemIcon);
        }
        // If this is small screen but no changes has made yet or menu is just trying to initialiezed for the first time then made the chages for small screen and remember that for this small type of screen, until screen size changed to wide screen.
        else if((_isAlreadyWide && (_currentWidth < breakingPoint)) || (!_isTfbMenuAlreadyResized && (_currentWidth < breakingPoint) && !_isAlreadyWide)) {

            // Just remember that, this menu is already resized
            _isTfbMenuAlreadyResized = true;
            
            // On the small screen environment, hide the main menu (although if user pressed mobile menu button, then that would be different case).
            if (jQuery('.tfb-menu').is(':visible') && (_currentWidth < breakingPoint)) {
                jQuery('.tfb-menu').hide();
            }

            // If user came from wide screen to smaller screen, the forget all the previous mouse hover events
            jQuery('.tfb-menu li').unbind('mouseenter mouseleave');  

            // User is in small screen now, which means user can't hover things on touch device. So, there will be click/tap type of event to navigate sub menu
            jQuery('.tfb-menu-parent a div:last-child').bind('click', function(mouseClickEvent) {
                // The sub menu expand clickable area is in the nest of anchor which has link to another page. But, we are her to navigate our option, not to visit another page. So just in case if user pressed on sub menu expand icon (drop icon by default), then instead of visiting another page, justepand the menu.
                mouseClickEvent.preventDefault();

                // Get the element/menu item, where user just clicked to expand menu
                var menuParent = jQuery(this).parent().parent();

                // If user clicked on menu item, then expand first. If user pressed again, then collapse.
                // To keep track on each and every parent menu item, save data called 'state' which holds boolean value
                // If parent menu item don't have any 'state' data, then create 'state' variable on that, and give true value for that, because user just clicked on the menu item.
                if (menuParent.data('state') === undefined) {
                    menuParent.data('state', true);
                }

                // Check which value state holds
                var state = menuParent.data('state');

                // Select where icon will be change
                var changedIconItem = jQuery(this).children('span');

                // If user clicked then expand
                if (state) {                 
                    // Change icon as expanded
                    if (changeIconWhenSubMenuExpandsInSmallerScreen) {
                        changedIconItem.removeClass(smallScreenCollapsedMenuIcon);      // Remove collapse icon
                        changedIconItem.addClass(smallScreenExpandedMenuIcon);          // Add expand ico   
                    }
                    
                    // Now start expanding
                    menuParent.addClass('hover');

                    // Expand with slide down animation. Although if user tries to change screen size, then there might multiple animation triggered on same unordered list. SO clear those animation queue and ust display one slide down animation.
                    menuParent.children('ul').filter(':not(:animated)').slideDown();
                }
                // If user clicked again, then collapse
                else {                    
                    // Change icon as collapse
                    if (changeIconWhenSubMenuExpandsInSmallerScreen) {
                        changedIconItem.removeClass(smallScreenExpandedMenuIcon);      // Remove expand icon
                        changedIconItem.addClass(smallScreenCollapsedMenuIcon);        // Add collapse icon
                    }

                    if (collapseAllSubmenuInSmallerScreen) {
                        // When user tries to collapse on list, then all the sub ordinate list should be collapsed too. Thats why all the sub ordinate states are false
                        menuParent.find('ul').data('state', true);

                        // All the sub menu of collpased menu are collapse
                        menuParent.find('.hover').removeClass('hover');
                    }

                    // Finally the list that clicked to be collapsed, is now collapse too
                    menuParent.removeClass('hover');

                    // To make collapse animation, we are making slide up animation. Again, if user changed screen size/resize, then multiple animation may triggered on on list. Which is unwanted. SO, clearing animation queue before displaying one slideup animation
                    menuParent.children('ul').filter(':not(:animated)').slideUp();

                    if (collapseAllSubmenuInSmallerScreen) {
                        // Now all the sub ordinate menues are hidden too.
                        menuParent.children('ul').find('ul').hide();
                    }
                    
                }

                // Toggle the state of the 'state' which user clicked
                menuParent.data('state', !state);
            });
        }
        
        // Screen size is wider then, must show the menu
        if (_currentWidth >= breakingPoint) {
            jQuery('.tfb-menu').show();
        }
        // If user changed screen to smaller one, then remove those icons meant for wide screen and assign icons for smaller screen
        else {
            // Removing wide screen icons from menu
            jQuery('.tfb-menu-submenu').removeClass(wideScreenSubMenuIcon);
            jQuery('.tfb-menu-item').removeClass(wideScreenMainMenuItemIcon);

            // Assign new icons for smaller screen
            jQuery('.tfb-menu-submenu').addClass(smallScreenCollapsedMenuIcon);
            jQuery('.tfb-menu-item').addClass(smallScreenCollapsedMenuIcon);
        }

        // If screen size is wide but, menu settings didn't chage, then change menu settings
        if ((_currentWidth >= breakingPoint) && !_isAlreadyWide) {
            _isAlreadyWide = true;
        }
        // If screen size is smaller but, menu settings didn't chage, then change menu settings
        else if((_currentWidth < breakingPoint) && _isAlreadyWide) {
            _isAlreadyWide = false;
        }
        

    }   // adjustMenu() method ended
    
    
}       // TfbMenu class ended