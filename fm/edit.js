
function ace_commend (cmd) { editor.commands.exec(cmd, editor); }
editor.commands.addCommands([{
    name: 'save', bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) { edit_save(this, 'ace'); }
}]);
function renderThemeMode() {
    var $modeEl = $("select#js-ace-mode"), $themeEl = $("select#js-ace-theme"), $fontSizeEl = $("select#js-ace-fontSize"), optionNode = function(type, arr){ var $Option = ""; $.each(arr, function(i, val) { $Option += "<option value='"+type+i+"'>" + val + "</option>"; }); return $Option; },
        _data = {"aceTheme":{"tomorrow":"白雪","tomorrow_night_eighties":"暗夜"},"aceMode":{"javascript":"JS","markdown":"MD","css":"CSS","html":"HTML","php":"PHP","ini":"INI","json":"JSON","python":"PYTHON","sql":"SQL","mysql":"MySQL","jsp":"JSP","less":"LESS","lua":"LUA","sass":"SASS","scss":"SCSS","sh":"SH","svg":"SVG","text":"TEXT","xml":"XML","java":"JAVA"}};
    if(_data && _data.aceMode) { $modeEl.html(optionNode("ace/mode/", _data.aceMode)); }
    if(_data && _data.aceTheme) { var Theme = optionNode("ace/theme/", _data.aceTheme); $themeEl.html(Theme);}
    $modeEl.val( editor.getSession().$modeId );
    $themeEl.val( editor.getTheme() );
}

$(function(){
    renderThemeMode();
    $(".js-ace-toolbar").on("click", 'button', function(e){
        e.preventDefault();
        let cmdValue = $(this).attr("data-cmd"), editorOption = $(this).attr("data-option");
        if(cmdValue && cmdValue != "none") {
            ace_commend(cmdValue);
        } else if(editorOption) {
            if(editorOption == "help") {
                var helpHtml="";$.each(window.config.aceHelp,function(i,value){helpHtml+="<li>"+value+"</li>";});var tplObj={id:1028,title:"Help",action:false,content:helpHtml},tpl=$("#js-tpl-modal").html();$('#wrapper').append(template(tpl,tplObj));$("#js-ModalCenter-1028").modal('show');
            }
        }
    });
    $("select#js-ace-mode, select#js-ace-theme, select#js-ace-fontSize").on("change", function(e){
        e.preventDefault();
        let selectedValue = $(this).val(), selectionType = $(this).attr("data-type");
        if(selectedValue && selectionType == "mode") {
            editor.getSession().setMode(selectedValue);
        } else if(selectedValue && selectionType == "theme") {
            editor.setTheme(selectedValue);
        }
    });
});