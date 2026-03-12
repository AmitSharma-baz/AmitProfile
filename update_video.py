import os
import json

# Configuration
VIDEO_DIR = r'assets/video'
OUTPUT_FILE = r'video-data.js'
EXTENSIONS = ('.mp4', '.webm', '.ogg', '.mov')

def main():
    # Base directory is the directory where this script is located
    base_dir = os.getcwd()
    abs_video_dir = os.path.join(base_dir, VIDEO_DIR)
    
    if not os.path.exists(abs_video_dir):
        print(f"Error: Directory not found: {abs_video_dir}")
        return

    # List compatible files
    files = [f for f in os.listdir(abs_video_dir) if f.lower().endswith(EXTENSIONS)]
    
    # Sort files to ensure consistent order
    files.sort()

    print(f"Found {len(files)} videos in {VIDEO_DIR}")

    # Generate the data structure
    video_data = {
        'all': []
    }

    for filename in files:
        item = {
            'src': f'assets/video/{filename}',
            'year': 'all',  # Default category
            'title': 'Video',
            'description': 'Moments captured on video',
            'category': 'video'
        }
        video_data['all'].append(item)

    # Convert to JSON string
    json_str = json.dumps(video_data, indent=4)
    
    # Create the JS content
    js_content = f"// Auto-generated video data\n\nconst videoData = {json_str};\n"

    # Write to file
    output_path = os.path.join(base_dir, OUTPUT_FILE)
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"Successfully created {OUTPUT_FILE}")
    except Exception as e:
        print(f"Error writing file: {e}")

if __name__ == "__main__":
    main()
