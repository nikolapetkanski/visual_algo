define(["user_output/algorithm_source"], function()
{

    function algorithm_source()
    {
        var d3_ = null;

        this.set_d3 = function(d3)
        {
            d3_ = d3;
        }

        var source_view_ = null;

        this.set_source_view = function(sv)
        {
            source_view_ = sv;
        }
        
        var ie_ = null;

        this.set_IE_interface = function(ie)
        {
            ie_ = ie;
        }

        var source_svg_ = null;

        this.show = function()
        {
            source_svg_ = source_view_
                .append("svg")
                .attr("id", "source_svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("display", "block");
        }

        this.render_code = function()
        {

            var source = ie_.get_source_text();

            var font_size = 14; // TODO

            var size = compute_size(source, font_size);

            if(size.max_width > source_svg_.node().getBoundingClientRect().width)
            {
                source_svg_.attr("width", size.max_width+"px")
            }
            else
            {
                size.max_width = source_svg_.node().getBoundingClientRect().width;
            }
            if(size.max_height > source_svg_.node().getBoundingClientRect().height)
            {
                source_svg_.attr("height", size.max_height+"px");
            }
            else
            {
                size.max_height = source_svg_.node().getBoundingClientRect().height;
            }

            var bbox_y = 0;

            for(var line in source.text)
            {
                var line_bg = source_svg_
                    .append("rect")
                    .attr("class", "line_bg")
                    .attr("id", "line_"+line)
                    .attr("y", bbox_y+3) // TODO:
                    .attr("width", size.max_width)
                    .attr("height", size.lines[line].height)
                    .attr("fill", "rgb(255,255,255)");

                bbox_y += size.lines[line].height;

            }

            var line_y = 0;

            for(var line in source.text)
            {

                line_y += size.lines[line].height;

                var line_text = printable_line(line, source.text[line]);

                source_svg_
                    .append("text")
                    .attr("xml:space", "preserve")
                    .attr("font-family", "monospace")
                    .attr("font-size", font_size)
                    .attr("y", line_y)
                    .text(line_text);
            }

        }

        this.update_code = function()
        {
            source_svg_
                .selectAll(".line_bg")
                .attr("fill", "rgb(255,255,255)");

            var line = ie_.get_current_line();

            source_svg_
                .select("#line_"+line)
                .attr("fill", "rgb(255,127,127)");

        }

        function compute_size(source, font_size)
        {

            var svg = d3_.select("body").append("svg");

            var size = 
            {
                max_width : -1,
                max_height : -1,
                lines : {}
            };

            for(var line in source.text)
            {

                var line_text = printable_line(line, source.text[line]);

                var text = svg
                    .append("text")
                    .attr("xml:space", "preserve")
                    .attr("font-family", "monospace")
                    .attr("font-size", font_size)
                    .text(line_text);

                var bbox = text.node().getBBox();

                var line_size = 
                {
                    width : bbox.width,
                    height : bbox.height
                }

                if(line_size.width > size.max_width)
                {
                    size.max_width = line_size.width;
                }

                size.max_height += line_size.height;

                size.lines[line] = line_size;

                text.remove();
            }

            svg.remove();

            return size;
        }

        function printable_line(line, text)
        {
            text.replace(/" "/g, "\u00A0");
            return text;
        }

    }

    return algorithm_source;

})