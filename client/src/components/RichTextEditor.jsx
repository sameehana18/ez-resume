import React, { useContext, useState, useEffect } from "react";
import {
    BtnBold,
    BtnItalic,
    Editor,
    EditorProvider,
    Toolbar,
    Separator,
    HtmlButton,
    BtnUnderline,
    BtnStrikeThrough,
    BtnNumberedList,
    BtnBulletList,
    BtnClearFormatting,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../context/ResumeInfoContext";

function RichTextEditor({onRichTextEditorChange, index, defaultValue=""}) {
    const [value, setValue] = useState(defaultValue || "");
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    useEffect(() => {
        setValue(defaultValue || "");
    }, [defaultValue])

    return (
        <div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e.target.value);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
