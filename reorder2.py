import re

def reorder_timeline():
    with open('timeline.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. find the wrapper start
    start_tag = '<div class="timeline-wrapper">'
    start_idx = html.find(start_tag)
    if start_idx == -1:
        print("wrapper not found")
        return
    
    content_start = start_idx + len(start_tag)

    # 2. find wrapper end by counting divs
    div_depth = 1
    pos = content_start
    while div_depth > 0 and pos < len(html):
        next_open = html.find('<div', pos)
        next_close = html.find('</div>', pos)
        
        if next_close == -1:
            break
            
        if next_open != -1 and next_open < next_close:
            div_depth += 1
            pos = next_open + 4
        else:
            div_depth -= 1
            pos = next_close + 6
            
    if div_depth != 0:
        print("Mismatched divs")
        return
        
    content_end = pos - 6 # before the last closing </div>

    # 3. extract items from within wrapper
    wrapper_content = html[content_start:content_end]
    
    pattern = re.compile(r'<!-- Timeline Item (\d{4}) -->')
    items = []
    
    matches = list(pattern.finditer(wrapper_content))
    for i in range(len(matches)):
        year = int(matches[i].group(1))
        start_pos = matches[i].start()
        if i + 1 < len(matches):
            end_pos = matches[i+1].start()
        else:
            end_pos = len(wrapper_content)
        
        items.append({
            "year": year, 
            "text": wrapper_content[start_pos:end_pos].strip()
        })
        
    if not items:
        print("No items found")
        return
        
    # sort items ascending
    items.sort(key=lambda x: x["year"])
    
    # 4. Construct 2026 item
    new_2026 = """<!-- Timeline Item 2026 -->
                <div class="timeline-item" data-year="2026">
                    <div class="timeline-marker">
                        <div class="timeline-icon">
                            <i class="fas fa-hourglass-half"></i>
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
                
    items.append({"year": 2026, "text": new_2026})
    
    # 5. Join
    new_wrapper_content = '\n\n                '.join([item["text"] for item in items])
    
    new_html = html[:content_start] + '\n                ' + new_wrapper_content + '\n            ' + html[content_end:]
    
    with open('timeline.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Success")

reorder_timeline()
