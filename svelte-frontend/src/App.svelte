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

<main class="flex flex-col items-center justify-center min-h-screen gap-4 bg-base-100 p-4">
    <button class="btn bg-primary-500 " on:click={increment}>Increment</button>
    <p class="outline rounded justify-start bg-primary-500 text-primary-contrast-500 p-4">{$count} + 1000: {$message}</p>
</main>

