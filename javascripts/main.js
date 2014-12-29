$(function(){

  $("#input").on("keyup", function(){
    var data = parse($(this).val());
    var res = toResult(data);
    $("#result").html(res.join("<br>"));
    //$("#copy").attr("data-clipboard-text",res.join("\n"));
  });

  function toResult(d){
    var result = [];
    var n = d.entry;
    var yokomax = 2 * d.entry + 5 + d.name_size
    var tatemax = yokomax - 3;

    var line = "";
    for(var i=0;i<n;i++){
      if (i==0){
        line += "┌─"; //左上横
      }else{
        line += "┬─";
      }
    }
    line += "┐";
    result.push(line);

    for(i=0; i < d.name_size; i++){
      line = "";
      for(var j=0;j<n;j++){
        line += "│";
        var name = d.list[j];
        var k = i - d.name_size + name.length;
        line += (k>=0)? name[k] : "　";
      }
      if(i == (d.name_size -1)){
        line +="│勝－負│＝名前＝";
      }else if(i== (d.name_size -2)){
        line += "├───┬"; //────"
        for(j=0;j<d.name_size;j++){
          line += "─";
        }
      }else{
        line += "│";
      }
      result.push(line);
    }// 上のほう
    line = "";
    line += "├";
    for(i=0;i<n;i++){
      line += "─┼";
    }
    line += "───┼";
    for(i=0;i<d.name_size;i++){
      line += "─";
    }
    result.push(line);
    line = "";

    $.each(d.list, function(i,name){
      for(j=0;j<n;j++){
        line += (i==j)? "│＼" : "│＿";
      }
      line += "│＿－＿│";
      line += name;
      result.push(line);
      line = "";

      if(i!= n-1){
        for(j=0;j<n;j++){
          line += (j==0)? "├─" : "┼─";
        }
        line += "┼───┼";
        for(j=0;j<d.name_size;j++){
          line += "─";
        }
        result.push(line);
        line = "";
      }else{
        for(j=0;j<n;j++){
          line += (j==0)? "└─" : "┴─";
        }
        line += "┴───┴";
        for(j=0;j<d.name_size;j++){
          line += "─";
        }
        result.push(line);
        line = "";
      }
    });
    return result;
    //if(n==0)
  }

  function parse(str){
    var ar = str.split("\n");
    var val = {
      list: [],
      entry: 0,
      name_size: 4
    };
    $.each(ar, function(i,x){
      if(x.length > 0){
        val.list.push(x);
      }
    });
    val.entry = val.list.length;
    $.each(val.list, function(i,x){
      if(val.name_size < x.length){
        val.name_size = x.length;
      }
    });
    return val;
  }
});
