define(["user_output/sequence_model", "user_output/position_model"], 
function(x, position_model)
{

    function sequence_model(model_svg)
    {
        var model_svg_ = model_svg;

        var prim_seq_ = model_svg_.append("g")
                                .attr("id", "prim_seq");

        var sec_seq_ = model_svg_.append("g")
                                .attr("id", "sec_seq");

        var positions_ = {};

        this.set_elements = function(elements)
        {

            var bb = model_svg_.node().getBoundingClientRect();

            var w = bb.width;
            var h = bb.height;

            var max = undefined;
            var min = undefined;

            if(elements.length != 0) {

                max = elements[0];
                min = elements[0];

                for(var i = 1 ; i < elements.length ; i++)
                {
                    if(elements[i] > max)
                        max = elements[i];
                    if(elements[i] < min)
                        min = elements[i];
                }
            }

            var width = w;
            var height = h*0.9;

            var scale_x = width/elements.length;
            var scale_y = (height/2)/max;

            var m = (h*0.1) / 3;

            var translate_y = 2*m + height/2; 

            prim_seq_.attr("transform", "translate(0,"+translate_y+") scale("+scale_x+","+scale_y+")");
            sec_seq_.attr("transform", "translate(0,"+m+") scale("+scale_x+","+scale_y+")");

            for(var i = 0 ; i < elements.length ; i++)
            {
                positions_[i] = new position_model(
                        i, elements[i], elements.length, 
                        prim_seq_, sec_seq_, max);
                positions_[i].draw();
            }
        }

        this.set_selected = function(v, pos, color)
        {
            positions_[pos].set_selected(v, color);
            positions_[pos].draw();
        }

        this.move_element = function(oseq, opos, nseq, npos)
        {
            var v = null;
            if(oseq == 1)
            {
                v = positions_[opos].get_pvalue();
                positions_[opos].set_pvalue(0)
            }
            else
            {
                v = positions_[opos].get_svalue();
                positions_[opos].set_svalue(0)
            }

            if(nseq == 1)
            {
                positions_[npos].set_pvalue(v);
            }
            else
            {
                positions_[npos].set_svalue(v);
            }

            positions_[opos].draw();
            positions_[npos].draw();

        }

        this.swap_elements = function(apos, bpos)
        {
            var a = positions_[apos].get_pvalue();
            var b = positions_[bpos].get_pvalue();

            positions_[apos].set_pvalue(b);
            positions_[bpos].set_pvalue(a);

            positions_[apos].draw();
            positions_[bpos].draw();

        }

    }

    return sequence_model;

})