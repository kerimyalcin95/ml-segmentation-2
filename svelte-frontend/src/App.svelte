<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const count = writable(0);
    const message = writable(0);

    onMount(() => {
        window.electronAPI.onMessage(msg => {
            let number = parseInt(msg) | 0;
            message.set(number + 1000);
        });
    });

    function increment() {
        count.update(n => n + 1);
        window.electronAPI.sendMessage($count.toString());
    }
</script>

<button on:click={increment}>Increment</button>
<p>{$count} + 1000: {$message}</p>