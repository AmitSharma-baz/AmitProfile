import os
import json

# Configuration
GALLERY_DIR = r'assets/gallery'
OUTPUT_FILE = r'gallery-data.js'
EXTENSIONS = ('.jpg', '.jpeg', '.png', '.mov', '.gif', '.webp')

def main():
    # Base directory is the directory where this script is located
    base_dir = os.getcwd()
    abs_gallery_dir = os.path.join(base_dir, GALLERY_DIR)
    
    if not os.path.exists(abs_gallery_dir):
        print(f"Error: Directory not found: {abs_gallery_dir}")
        return

    # List compatible files
    files = [f for f in os.listdir(abs_gallery_dir) if f.lower().endswith(EXTENSIONS)]
    
    # Sort files to ensure consistent order (optional, by name)
    files.sort()

    print(f"Found {len(files)} images in {GALLERY_DIR}")

    # Generate the data structure
    # Structure: 'all' category containing all images
    # We assign a default title/desc, user can manually edit if they really want, 
    # but the primary goal is auto-loading.
    gallery_data = {
        'all': []
    }

    for filename in files:
        item = {
            'src': f'assets/gallery/{filename}',
            'year': 'all',  # Default category
            'title': 'Gallery Photo',
            'description': 'Moment captured',
            'category': 'community' # Default category
        }
        gallery_data['all'].append(item)

    # Convert to JSON string
    json_str = json.dumps(gallery_data, indent=4)
    
    # Create the JS content
    js_content = f"// Auto-generated gallery data\n// Run update_gallery.bat to update this file after adding images\n\nconst galleryData = {json_str};\n"

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
