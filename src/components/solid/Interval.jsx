export default function Interval({ name, value, onRemove, onChangeName, onChangeValue }) {
  return <div class="flex gap-x-4 gap-y-2 flex-wrap text-2xl">
    <input class="text-black py-2" placeholder="Name" onInput={onChangeName} value={name} />
    <div class="flex gap-2 items-center">
      <input class="text-black py-2 w-20" placeholder="Value" inputmode="decimal" onInput={onChangeValue} value={value} />
      <span>seconds</span>
    </div>
    <button onClick={onRemove} class="font-semibold border border-white rounded text-lg py-2 px-4">Remove</button>
  </div>
}