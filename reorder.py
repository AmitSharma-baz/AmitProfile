import re

with open('timeline.html', 'r', encoding='utf-8') as f:
    text = f.read()

# The wrapper begins at <div class="timeline-wrapper"> and ends before <!-- Statistics Section -->
start_idx = text.find('<div class="timeline-wrapper">')
if start_idx == -1:
    print("Could not find <div class=\"timeline-wrapper\">")
    exit(1)

# Find the start of the first item
first_item_start = text.find('<!-- Timeline Item', start_idx)

# Find the end of the last item. It should be right before the closing </div> of timeline-wrapper.
end_idx = text.find('</section>', first_item_start)
wrapper_end_idx = text.rfind('</div>', first_item_start, end_idx)

wrapper_content = text[first_item_start:wrapper_end_idx]

# Split the content by "<!-- Timeline Item "
parts = ('<!-- ' + wrapper_content).split('<!-- Timeline Item ')
items = []
for part in parts:
    part = part.strip()
    if not part: continue
    
    # Extract year
    match = re.search(r'^(\d{4}) \-\-\>', part)
    if not match:
        print("Could not match year in part:", part[:50])
        continue
        
    year = int(match.group(1))
    items.append({"year": year, "html": '<!-- Timeline Item ' + part})

# Sort items by year ascending
items.sort(key=lambda x: x["year"])

new_2026 = """<!-- Timeline Item 2026 -->
                <div class="timeline-item" data-year="2026">
                    <div class="timeline-marker">
                        <div class="timeline-icon">
                            <i class="fas fa-hourglass-half" style="color: #6c757d;"></i>
                        </div>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-card">
                            <div class="timeline-date">2026</div>
                            <h3 class="timeline-event-title">Coming Soon</h3>
                            <p class="timeline-description">
                                Stay tuned for upcoming initiatives and public services in 2026.
                            </p>
                            <div class="timeline-activities">
                                <div class="activity-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Coming Soon:</strong> New programs and activities will be updated here.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>"""

items.append({'year': 2026, 'html': new_2026})

# Join back
new_wrapper_content = '\n\n                '.join([x["html"] for x in items])

# Create the final new text
new_text = text[:first_item_start] + new_wrapper_content + '\n            ' + text[wrapper_end_idx:]

with open('timeline.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Reordering successful")
