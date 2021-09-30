<script>
  const genID = (len) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  let eventName = genID(20);
</script>

<div
  class="flex flex-wrap my-4 px-2 bg-black-900 dark:bg-black-100 w-full rounded-lg"
>
  <input
    type="text"
    bind:value={eventName}
    placeholder="my-event"
    class="bg-transparent flex-1 my-2 px-4 py-1 outline-none overflow-ellipsis"
  />
  <div
    on:click={() => (eventName = genID(20))}
    class="bg-white dark:bg-black hover:bg-black-900 dark:hover:bg-black-100 px-2 py-1 my-2 rounded-lg border-black dark:border-white border cursor-pointer whitespace-nowrap flex-grow"
  >
    random event
  </div>
</div>
<div class="flex">
  <a target="_blank" href={`/receive/${eventName}`} class="button mx-2 flex-1">
    await call
  </a>
  <a target="_blank" href={`/send/${eventName}`} class="button mx-2 flex-1">
    send trigger
  </a>
</div>
