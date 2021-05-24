import React, { useEffect, useState } from "react";
import Outputs from './components/Outputs';
import { init, handleKeyDown, handleInput, nativeFunctions } from './misc';
import TerminalyInstance from './terminal';
import '../styles/index.css';
const defaultStyle = {
    fontSize: "14px",
    color: "white",
    keywordColor: "rgb(81, 246, 164)"
};
export function TerminalyWindow({ id = "", sessionName, customProps, customStyle, commandHandler, nativeHandler, keywords, commands }) {
    const [IP, setIP] = useState(null);
    const [inputText, setInputText] = useState("");
    const [outputs, setOutputs] = useState([]);
    const [cmdHistory, setCmdHistory] = useState([]);
    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(null);
    const style = Object.assign(Object.assign({}, defaultStyle), customStyle);
    const natives = nativeFunctions(setOutputs);
    useEffect(() => init(setIP, keywords, id, natives, commandHandler, nativeHandler, commands), []);
    useEffect(() => {
        const editor = document.querySelector(`#terminaly_${id}`);
        editor === null || editor === void 0 ? void 0 : editor.scroll(0, editor === null || editor === void 0 ? void 0 : editor.scrollHeight);
    }, [outputs]);
    useEffect(() => {
        if (cmdHistoryIndex !== null) {
            const editor = document.querySelector(`#terminaly_field_${id}`);
            if (cmdHistory[cmdHistoryIndex] !== undefined) {
                if (editor !== null) {
                    editor.innerHTML = cmdHistory[cmdHistoryIndex];
                    const temp = document.createElement('DIV');
                    temp.innerHTML = cmdHistory[cmdHistoryIndex];
                    setInputText(temp.textContent);
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(editor);
                    range.collapse(false);
                    sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
                    sel === null || sel === void 0 ? void 0 : sel.addRange(range);
                    editor.focus();
                    range.detach();
                }
            }
        }
        natives.dl({ filename: 'logo', link: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEg0SEg0NDQ0NDQ0IDg4PDQ8IDg0NFREXFhcRFRUYHCggGBomGxMTIjEhJSkrLi4uFx80RDMsNygtLisBCgoKDg0ODw8PFS0fIB4rNy03Ny43LSs3NzcrLS03LTcrKy0tKysrNzc3NysrLS03NystKy0rNystLS0tLSstK//AABEIAL4BCAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAD0QAAIBAwEGAwUGBQEJAAAAAAABAgMEESEFEjFBUWEiMnEGE0KBkRRSYqGxwSNDctHh8QcVJDRjgpKiwv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAQEAAgIDAQEAAgMAAAAAAAABAhEDEiExQVEEIoETMmH/2gAMAwEAAhEDEQA/APDgAAAAAAAAAAAAmt7aU3iMXJ9uC9Ryb9BCBuW2wHo6k8fhh4n9eBp0LCnDywWV8T8b/M2x4Mr7Z3kk9OZo2NSflpya6vwr6sv0tgz+KcY9lmb/ALHQZG5Np/PjPbO8uV9MynsGnznOXpiC/csw2TQX8vPrKUv3LiYZLnHhPhdsr9Rxs6S4UoJ/0Ikp0YrhCMXjdzGKi/yQZFyVJJ8LZ5HUpRl5oRk/LmSUn+Y7IZC+QhlZUnxpQf8A2Ignsii/5eP6ZSX7l3IouuN9w939ZFTYFPlOpH1xUX6IqVtgTXlnGXZ5g/7HRDSLw4X4czyn1x9axqQ81OSXVeJfVFY7kq17GnPO9TWX8S8EvqjLL+f8q5y/scgBt3OwuLpzz+Gfhf1Mmtbyg8Si4vuY5YWe40mUvqogACDAAAAAAAAAAAAAAAAAAAS29CU2owi5yfBLU0Nk7FnWw34KXOb4y7R6nXWVpCkt2EN1Pi/NJ+rN+Pgyy81nnyTHxGHY+zSWJVZZfm93Hh6N8/ka8aaikoxUYrgkt1FuZFNHXjhjjNSMLlcvaHA1xHMGCUM0RlhjHEKaLeFCcRmQUemKmR5HZBKTIZGZBMAkATIuQijhoAMEGsGxB1IGVIqSw0pRfFPxIcNySqMm82MtXTeH9x8PkzGq0nFtSi4tcmdgQV6EZrEo56PmvRnPnwy+cWmOdntyYF292dKnr5ofeXL1KRzWWXVayy+gAAIwAAAAAAAp0ewPZ/f3atVYp+aEH5qnRvpH9Rns1sjfaq1I5pR8sX8bXN9kde5nZ/Pwy/5ZRhy8l9Yo91JJJKMYrdSXhSS5EbJGyNnXfLCDI1oBMkWmjmhjJmiOaEaFhkc0NyIDAk4C5HJgpVaDJYqQKwAuRyYwMgEiFyR5HZAJMjWxEwyNIDIjYCVCAIxMiBw0MgBka7ZT4p8DHvdkSe9KlCUopOrKEYubhBauWnJc+hsHpPsfaRsLSd7Ujm6u4yoWsHjMKb0csPqZ8slx8tOKW5ajwYDqPazYXu/48ElTnJ78Fhbk30XT9Dlzjs14bZY3G6oAAEQNbYGyZXE3o1SppVKku3KPqzLS+p6l7MWcbejGm14p/wAWq+s3y+S0Or+XhnLn59RlzcnXHwpuO7hJbsYrdSXhSXQYpGptCyx4lrFmVOJ38uNlcmNliSExStkcpmW16TOIxoVTJFqHsIsDGWnTIXAehtXmiNosNEbRGhEQqEaCHMFpEyO4p818xw+D/wAgln5DJNd0ca8mVxLiTIuSPIqYBJkMkeR2RkkEG5HAYGjhogBAHUqTnKMYxcpTkoRiuLb0SAOg9hvZ77ZXW/4bagvtNeo+G4td31Z0HtJtJXVduDxb0I+4oxXhShHTgX7+K2dZ07KDX2q4Sr3c1xWeEfocdtW5VKnurSpNbvy5swt7Xbv4cJx498mXty795JxWtOHhxyfU42/tdyX4ZeKL/Y6BkF7b78GviXii+4Z4bx057ncsrlXOADX5Acqm37KWanWUpLMKK96/6vh/PU7tVO5y/svT3aTlzqTb+UdF/wDRt++PV/mx64S/ri5bvNs0Lrk9Yvkyvd7PUsum8/hKMLktULjo8HR334rLrr0zqlNrRrBE0bk6il5oqXfmVKllF+WWOzM8sJfVVMv1mZHwmS1LSS5ZXYhcH0M7hZ8XuLNOsSZTKCJoTCbnsJp0iFwJVWH7yYBTcSHGC+4EU6XYWvwbVATFmsAsdcPuHs0yw1h8GZ9xQcX25Muwg/X0JXBSWHx/MnrRKx2GSa5t3B8NOTK4tL9pMi5GZDIBJkdkjyKmASZAZkdkADuv9nuzY0oVtpVob1O2ThbxlwqV3wfyOT2Hsyd1XpUKa8VWajnklzb9Ed77XXMYe4sKEv8Ah7WKjNR4Trc2+upnnfjbg4+2TEuryVSdWvVeZTbqyz+SORvbl1Jyk+fBdEaW3Lv+WnpHz45voYrDCa8tP6OTd6z4QMgIh1zxibVo7s88prf+fMC9tanmGecZL6PQDk5JrKtZfDodn0d2lSXSnHPq1l/qTl5UY4SWiSUUuyIKlA9jrrGSOHtu1RqMIVmuZLVolZozssvlcsaFC+6lqE4y4PDMUIVWuYrdFptTTXdEM59iC3vnzLiqRkOZVOtfFZyXQbiPoWJ26fBledux7qvAUV1HKPch3WJqP/Q/2spdyRL5lPXqPUn1D/QS1bfJSqW7L8JshqyZNxhyqeGh3v3zwyX3q6CYROjCmpaSKdxZtarWJc3O46Dx3RPUMVhk2atpGfLEihX2fOPLKJ61W1bIuRHF9BMgaRMVMjTOo9gdgfa7jNTS0tl9quJvhhaqPzFbrycna6dN7NWq2fZSuprF7fRdC3g/C4UXxl8zmrmv7uEpt5m28Z5zfM2/aHazuq0prEaFP+FRh5VCC0X6HF7Vu9+enlj4Y/uzHGbvl32zi49fapzecvOW3qxooxmzz97uyMQVjSKqBxymuoDkAluioVtIvlJKWPVZJpsy9lV96jRecvcUW/NrHwv9C5Crg7pluSuO46tiVlavQLQjQ979lGXOOCKZqVaGfUza8BZYXS5kamTU6uCKnSfourJN6Eee8+xEx17O1dpVy1CZkfbekUv/AGY9X0/vYXYO2E+l1ta2M/CNdBehm/aX95jlWfV/+Qf8mP4nrV12/cZ7h9Ct7x9WCrPqyu+I61cUH0CpHjoV4V5dSdV2HfGjVU6kOxXmXak+xBP0DeNV5it70eroZNLoyCcV1Iuvip/6vU7pdcFmndow2u4m++pPaqsjonGnPon8ivV2Tnysx1Xl94np31RcJMNyjRamz6iaSi5SbUUlHey3okeiXtL/AHfY0rJf81c4vLprwuCeqhp0MX2OuqqdW5nSVejZx96t7EV756QXfXUjuNpOvUqVarfvZyc2m/yRjnN3w6f57jLvJR2rc+7p7qfimt3TlDqc/kkv67nUm313V2S5EOQxmonm5O+VPGsMgytsiDWOGsinAgG1J7qb5L/QBLT+ytzmnOD4wlvL0l/lGuzjth3Xu6sdfDP+FLprwf1OxmjTgz7YSfjHlmsqmpS7kzKSL9trozpx3WN9bOpwyVb+CjnTMvyLrnu6cE+ZUv45TOmWTGxnPbCr12+enTkR5CvHDYzJ52Vtvl1zSRMepEWQyQFlSJVIpqRJCZWy0uKQ5MrwkSqQ9p0nplqnAr0GtNdCxO9hFDCT7OR1KMfvYM+42u+SM+rdzlzDY00qrh1KtScCi5PqNJuS5FipOPQicuw0bgnZl3iezozqzp04JynUmqUIrm3oVzvfYK0VtSqbRq03KT3rWxj/ANTHiq69OCFbqBt7ctIWlC2sIS3pU8XN1NfHXlxz6Hn+37pOpuw0UPDKS5vmbG2dpSjGpOcnKtWbkm5bz14s49vvq+IsZ9XfE0fkVMYgyUhNkGxiYZAFyDEBCpxS2vUxFR5yf5ICjtCtvTfSPgXy/wAgcvJd1tJ4Vjr9i7Q97BJvNSCUJdXHkzkCxYXbpTjNapaNdY80VxcnTIs8e0d3SiWHLHArWlaMoxlF+FrKYrlxPWw1rw4bLvSW4raIkTzEpVJFq28rL47u0svEjCvV4n6lcsbQfiZWycXJ/wBq6J6hchkaBAPyOUiHIZFs1hSJFVKykLvDlJadwQ1JZI94Ml72NEYg4axWA1iDhpJgAAAGb9D2oqOFCnUxKjb01QpxjHdSS5+vcwAFfInhb2pfOrUcuEfLFdEVAAcHsAAACpjhgqAHlW+uNyLx5paL92T1JqKbbwksswrms5ybfol0RlyZai8JtEAAczUAAAGpsXajotp+KlNreXOL+8v3OupyTSkmpRkt6MlwaPPTW2Ntd0XuyW/Sk9Y849Wv7HX/AD8/WzHK+GPLx9vMdWqe8yzcTUIY7ENK9puKlCSafBr9DMv7rePTy5MMMf8AGuWY5W+VSvPLZEOGnn73dtzhoBkRgAyDADIqY0AFOyCYgDB+QEEyVsgxRoEmAYAAAAAgcA1DgBrAcNAAG8ZbeElqxJSUU23hLmZN3duenCK5de7IzzkipjsXt1vvC0iuC69ysgEOa227raTQAAEAAAAAAABNbXMoPMXo+K5M17e8jPGu7LnF/sYQpePJZ4K4yujwNZl2+0JLSXiXX4kaNK4jLyyy+j8LN8c5fTK42HALgQtJBRAAAAAABciAMFyGRAAFEYZAAEhRAEChkQABcgIR1a0Y8Xh9PMwt17CXJXuLqMPxS+6v3KVe/b8vhXX4imZZcvzFpMP1LXruby36LkiIAMLd+a0AAAgAAAAAAAAAAAAAAABMAALdK/nHi95fi4/UuU9oQfHMX38SMgDScmU+lcZXQQknwaku3iFOfUscG0+2hPC9mviz66mk5p9iLh+VsAZ0dovnGL9G4kkdoLnFr0wy5nKnrfxbDJDC5i86S06pEqK3KnR4DRHLAbB4Fed1FYypa9Ev7kU9oRXwt/SIrlJ7OY2roGbPaL5RivVuRDO8m/ix6aEXlxiula05JcWorv4SvVv4rhmT7eFGU3nuIZ3mvxcwn1aq30nw8K7cfqVmwyIRbb7VJJ6AABIAAAAAAAAAAAf/2Q==' });
    }, [cmdHistoryIndex]);
    return (React.createElement("div", Object.assign({ className: "terminaly_container" }, customProps, { style: Object.assign(Object.assign({}, style), { ['--terminaly_keyword']: style.keywordColor }) }),
        React.createElement("div", { className: 'terminaly_', id: `terminaly_${id}` },
            React.createElement(Outputs, { outputs: outputs }),
            React.createElement("div", { className: "terminaly_line" },
                React.createElement("p", null, sessionName ? sessionName : IP ? IP : "user"),
                React.createElement("div", { contentEditable: true, onInput: (event) => handleInput(event, setInputText), onKeyDown: (event) => {
                        handleKeyDown(commandHandler, event, inputText, cmdHistory, setCmdHistory, setCmdHistoryIndex);
                    }, spellCheck: "false", className: 'terminaly_field', id: `terminaly_field_${id}` }))),
        !(customStyle === null || customStyle === void 0 ? void 0 : customStyle.hideBar) && React.createElement("div", { className: "terminaly_bar" })));
}
export default TerminalyInstance;
//# sourceMappingURL=index.js.map