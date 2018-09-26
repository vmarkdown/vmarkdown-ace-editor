import Editor from './editor';
import ace from './ace';

class AceEditor extends Editor {

    constructor() {
        super();

        const self = this;

        this.editor = ace.edit("editor", {
            highlightActiveLine: false,
            showGutter: false
            // options
            // fontFamily: '"Microsoft YaHei","WenQuanYi Micro Hei",SimSun,Song,sans-serif'
        });

        this.editor.setFontSize(16);
        this.editor.setTheme("ace/theme/github");
        this.editor.session.setMode("ace/mode/markdown");
        this.editor.setOption("wrap", "free");
        this.editor.setAnimatedScroll(false);

        self.$onCursorChange = self.onCursorChange.bind(this);
        this.editor.session.selection.on("changeCursor", self.$onCursorChange);
        this.editor.session.on("changeScrollTop", function () {
            setTimeout(function () {
                let top = self.editor.session.getScrollTop();
                self.$emit('scroll', top<1?0:Math.abs(top));
            },0);
            // console.log('=',scrollTop,self.editor.session.getScrollTop(), self.editor.getFirstVisibleRow());
            // setTimeout(function () {
            //     console.log('=',scrollTop,self.editor.session.getScrollTop(), self.editor.getFirstVisibleRow());
            // },0);
        });
    }

    onCursorChange(e, editor) {
        const cursor = editor.cursor;
        const self = this;
        self.$emit('cursorChange', {
            line: cursor.row+1,
            column: cursor.column+1
        });
    }

    getValue() {
        return this.editor.getValue();
    }

    setValue(value) {
        const self = this;
        this.editor.session.selection.off('changeCursor', self.$onCursorChange);
        this.editor.setValue(value, -1);
        this.editor.session.selection.on('changeCursor', self.$onCursorChange);
    }

    scrollTo(scrollTop) {
        this.editor.session.setScrollTop(scrollTop);
    }

    async scrollToLine(line) {
        // this.editor.gotoLine(line, 0, true);
        const self = this;
        return new Promise(function (resolve) {
            self.editor.scrollToLine(line-1, false, true, function () {
                resolve();
            });
        });
    }

    getFirstVisibleRow() {
        return this.editor.getFirstVisibleRow() + 1;
    }

    getLastVisibleRow() {
        return this.editor.getLastVisibleRow() + 1;
    }
}


export default AceEditor;
