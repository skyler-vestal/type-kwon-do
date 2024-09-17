import json

def process_file(input_file_path, output_file_path):
    try:
        # Read the file and parse data
        with open(input_file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        # Initialize variables
        total_sum = 0
        character_data = {}
        
        # Process each line in the file
        for line in lines:
            character, value = line.strip().split(',')
            value = int(value)
            total_sum += value
            
            if character not in character_data:
                character_data[character] = {'total': 0, 'runningSum': 0, 'frequencyPercentage': 0}
            
            character_data[character]['total'] = value
            character_data[character]['runningSum'] = total_sum
        
        # Calculate frequency percentage
        for character, data in character_data.items():
            data['frequencyPercentage'] = (data['total'] / total_sum)

        character_data['total'] = total_sum
        
        # Write to JSON file
        with open(output_file_path, 'w', encoding='utf-8') as json_file:
            json.dump(character_data, json_file, ensure_ascii=False, indent=4)
        
        print(f"Data has been processed and saved to {output_file_path}")
    
    except FileNotFoundError:
        print(f"The file at {input_file_path} was not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

input_file_path = './src/assets/meme.csv'  # Replace with your input file path
output_file_path = './src/assets/data.json'  # Replace with your desired output file path
process_file(input_file_path, output_file_path)
