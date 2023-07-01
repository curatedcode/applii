<template>
  <div class="min-h-screen relative">
    <nav class="bg-site-blue text-white p-2">
      <div
        class="flex gap-4 max-w-7xl ml-4 items-center relative left-1/2 -translate-x-1/2"
      >
        <NuxtLink to="/">
          <img src="/favicon.ico" alt="Applii Logo" class="p-2 w-14" />
        </NuxtLink>
        <ul class="flex gap-4 font-medium">
          <li>
            <NuxtLink
              to="/"
              class="border-b border-transparent hover:border-white transition-colors"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/applications/create"
              class="border-b border-transparent hover:border-white transition-colors"
            >
              Create application
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <div class="max-w-7xl relative left-1/2 -translate-x-1/2 pb-24">
      <NuxtPage />
    </div>
    <footer class="absolute bottom-0 p-4 text-center w-full">
      Made with ❤️ by
      <ExternalLink
        href="https://zackaryf.net"
        class="border-b border-transparent hover:border-black transition-colors"
        >Zack</ExternalLink
      >
    </footer>
  </div>
</template>
