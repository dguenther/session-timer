import { createEffect, createSignal } from "solid-js";

import Interval from "./Interval";

export default function IntervalList() {
    const [list, setList] = createSignal(window.location.hash ? base64ToJS(window.location.hash) : [['New Interval', 30]])

    createEffect(() => {
        window.location.hash = jsToBase64(list())

    })

    const nameHandler = (i, item) => {
        list()[i][0] = item.target.value
        setList([...list()])
    }

    const valueHandler = (i, item) => {
        list()[i][1] = item.target.value
        setList([...list()])
    }

    const removeFromList = (i) => {
        setList([...list().slice(0, i), ...list().slice(i+1)])
    }

    const addToList = (i) => {
        setList([...list(), ['New Interval', 30]])
    }

    return <div>
        <h1 class="text-4xl font-semibold mb-4">Intervals</h1>
        <div class="flex flex-col items-center gap-y-4">
        <For each={list()}>
            {(item, index) => 
                <Interval
                    onChangeName={[nameHandler, index()]}
                    onChangeValue={[valueHandler, index()]}
                    onRemove={[removeFromList, index()]}
                    name={item[0]}
                    value={item[1]}
                />
            }
        </For>
        </div>
        <div class="flex gap-4 justify-center mt-6 text-lg">
            <button onClick={addToList} class="font-semibold border border-white rounded py-2 px-4">Add Interval</button>
            <a href={`/session-timer/#${jsToBase64(list())}`} class="font-semibold border border-white rounded py-2 px-4 inline-block">Save</a>
        </div>
    </div>
}

function base64ToJS(base64) {
    if (base64.startsWith('#')) {
        base64 = base64.slice(1)
    }
    const binString = atob(base64);
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(binString, (m) => m.codePointAt(0))));
}

function jsToBase64(obj) {
    const json = JSON.stringify(obj)
    const encoded = new TextEncoder().encode(json);
    const binString = Array.from(encoded, (byte) =>
        String.fromCodePoint(byte),
    ).join("");
    return btoa(binString);
}