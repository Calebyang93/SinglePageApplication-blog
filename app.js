var spa = (function ($) {
    var 
        configMap = {
            extended_height: 434,
            extended_title: 'Click to retract',
            retracted_height: 16,
            retracted_title: 'Click to extend',
            template_html: '<div class="spa-slider"></div>'

        },
        $chatSlider,
        toggleSlider, onClickSlider, initModule;
    initModule = function($container) {
        $container.html(configMap.template_html);
        $chatSlider = $container.find('spa-slider');
        $toggleSlider = $container.find('toggle-slider');
        $chatSlider
        .attr('title',configMap.retracted_title)
        .click(onClickSlider);
        return true;
        $toggleSlider 
        .attr('title',configMap.retracted_title)
        .click(onToggleSlider);
        return true;
    };
    return { initModule : initModule};
    return {toggleSlider: toggleSlider};
    

}(jQuery));
