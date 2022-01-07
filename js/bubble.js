async function bubSort(arr, size, bars) {
    let swaps = 0;
    let comparisons = 0;
    let sorted = false;

    for (let i = 0; i < size; i++)
    {
        if (sorted)
            break;
        sorted = true;

        for (let j = 0; j < size - i - 1; j++)
        {
            // show the bars getting compared and update compare count
            updateColor(bars, j, traverse_color);
            updateColor(bars, j + 1, traverse_color);
            comparisons++;
            updateComps(comparisons);

            await waitforme(delay + 100);

            if (arr[j] > arr[j + 1])
            {
                sorted = false;
                updateColor(bars, j, "red");
                updateColor(bars, j+1, "red");

                await waitforme(delay);

                swap(arr, j, j + 1, bars);
                ++swaps;
                updateSwaps(swaps);
                await waitforme(delay + 50);
            }
            else 
            {
                // #289672 = green color
                updateColor(bars, j, "#289672");
                updateColor(bars, j + 1, "#289672");
                await waitforme(delay + 100);
            }

            // after bar is processed go back to original color
            updateColor(bars, j, barpurple);
            updateColor(bars, j + 1, barpurple);
            await waitforme(delay);
        }

        // at this moment el at last will be sorted
        updateColor(bars, bars.length - 1 - i, sorted_color)
    }

    for (let i = 0; i < bars.length; i++)
    {
        updateColor(bars, i, sorted_color);
        await waitforme(delay - 100);
    }
}