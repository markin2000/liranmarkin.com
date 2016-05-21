$('#code').bind("input change",function(){
    execute_program();
});
$('#input').bind("input change",function(){
    execute_program();
});
var examples_dir = "examples";
$('#example1').click(function(){
    $.ajax({
        url : examples_dir+"/example1.txt",
        dataType: "text",
        success : function (data) {
            $("#code").val(data);
            execute_program();
        }
    });
});
$('#example2').click(function(){
    $.ajax({
        url : examples_dir+"/example2.txt",
        dataType: "text",
        success : function (data) {
            $("#code").val(data);
            execute_program();
        }
    });
});
$('#example3').click(function(){
    $.ajax({
        url : examples_dir+"/example3.txt",
        dataType: "text",
        success : function (data) {
            $("#code").val(data);
            execute_program();
        }
    });
});
$('#example4').click(function(){
    $.ajax({
        url : examples_dir+"/example4.txt",
        dataType: "text",
        success : function (data) {
            $("#code").val(data);
            execute_program();
        }
    });
});
$('#example5').click(function(){
    $.ajax({
        url : examples_dir+"/example5.txt",
        dataType: "text",
        success : function (data) {
            $("#code").val(data);
            execute_program();
        }
    });
});
$('#new_code').click(function(){
    $("#code").val("");
    execute_program();
});
$('#compile').click(function(){
    compileFSM();
});