import { flavorEntries, version } from '@catppuccin/palette';
import { writeFileSync } from 'fs';

// This script generates a JSON file containing the colors from the Catppuccin palette.
const OUTPUT_FILE = "catppuccin-peacock-colors.json";

// This is the list of flavors to include in the output
const INCLUDED_FLAVORS = ["Latte", "Frappé"]

/**
 * Main function to generate the color palette for peacock
 */
function main() {
    console.log(`@catppuccin/palette version: ${version}`);

    const peacockColors = [];

    flavorEntries.forEach(([_, flavor]) => {
        if (!INCLUDED_FLAVORS.includes(flavor.name)) return;

        flavor.colorEntries.forEach(([_, color]) => {
            if (!color.accent) return;

            const peacockColor = {
                name: `Catppuccin ${flavor.name} - ${color.name}`,
                value: color.hex,
            };
            peacockColors.push(peacockColor);
        });
    });

    console.log(`Writing output to ${OUTPUT_FILE}`);
    writeFileSync(OUTPUT_FILE, JSON.stringify(peacockColors, null, 2), 'utf-8');
    console.log(`Successfully wrote ${peacockColors.length} colors to ${OUTPUT_FILE}`);
}

// Run the main function
main();
