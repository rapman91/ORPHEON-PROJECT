@echo off
echo === ORPHEON | LANZADOR TOTAL DE NODOS ===

for %%D in (ORPHEON_*) do (
    if exist "%%D\clones" (
        echo Lanzando clon en: %%D
        pushd %%D
        if exist visor\visor.json (
            type visor\visor.json
        )
        popd
        echo ------------------------------
    )
)

echo Todos los nodos han sido inspeccionados simbólicamente.
pause
