# Searching for names in Euskaltzaindia

Searching for a name in [Euskaltzaindia's EODA](https://www.euskaltzaindia.eus/index.php?option=com_ecoeoda&task=izenaPortada) is not practical.

Therefore, I scrapped all names and made some customized queries to explore this DB.

## Set up

Make sure to have [Deno installed](https://docs.deno.com/runtime/getting_started/installation/) in your SO.

Then, go to the root of this project and install dependencies with:

```console
deno install
```

## Scrap

All names and descriptions are already stores in `names.json`.

Nevertheless, if you want to scrap them from scratch, just run:

```console
deno task scrap
```

## Run

Modify the script to make the searches you like and run them with:

```console
deno task search
```