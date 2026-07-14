# 🎯 Remaining Requirements Implementation Plan

## Status Overview

| # | Requirement | Status | Priority |
|---|-------------|--------|----------|
| 1 | Multi-Language Translation | ✅ COMPLETE | HIGH |
| 2 | NGO Donation Amount Visibility | ✅ COMPLETE | MEDIUM |
| 3 | Authority Portal Image Visibility & Upload | 🔄 IN PROGRESS | HIGH |
| 4 | Before & After Image Display in Issue Cards | 🔄 IN PROGRESS | HIGH |
| 5 | Branding Consistency (Remove Tricolor) | 📋 PLANNED | MEDIUM |
| 6 | NGO Request Visibility in Authority Portal | 📋 PLANNED | HIGH |
| 7 | Trust Score in Citizen Profile | 📋 PLANNED | MEDIUM |

---

## Requirement #3 & #4: Image Visibility & Before/After Display

### **Current State:**
- Issue type already has `imageUrl` and `resolutionImageUrl` fields
- Citizens can upload images when reporting issues
- No current UI for contractors/NGOs to upload resolution images
- Authority Dashboard doesn't display images

### **Implementation Plan:**

#### **3.1: Citizen-Submitted Images**
- ✅ Display citizen images in issue cards (Authority Dashboard)
- ✅ Show full-size image in issue detail modal
- ✅ Image lightbox for better viewing

#### **3.2: Resolution Image Upload (Contractors/NGOs)**
- Add image upload capability in Collaborator Portal
- Add "Upload Resolution Image" button for completed work
- Track uploader ID and timestamp
- Validate image format and size

#### **3.3: Before & After Image Comparison**
- Create side-by-side comparison component
- Show "Before" (citizen image) and "After" (resolution image)
- Add to issue cards when resolution image exists
- Add to issue detail modals

---

## Requirement #5: Branding Consistency

### **Current Tricolor Usage:**
1. Headers with gradient backgrounds
2. Flag-style visual elements
3. Color schemes using orange-white-green

### **Implementation:**
- Replace tricolor gradients with single JANMARG brand color
- Use consistent government blue or professional gray
- Maintain flag element only in logo/icon
- Keep branding subtle and professional

**Brand Colors to Use:**
- Primary: Deep Blue (#1E40AF)
- Secondary: Gray (#374151)
- Accent: Teal/Green (#10B981)
- Background: Light Gray (#F9FAFB)

---

## Requirement #6: NGO Requests in Authority Portal

### **Current State:**
- NGOs can raise resolution requests
- Requests stored in localStorage with status
- NO visibility in Authority Dashboard

### **Implementation:**
- Add "NGO Requests" tab in Authority Dashboard
- Show pending, approved, and rejected requests
- Add approve/reject actions with notes field
- Real-time updates when NGO submits request
- Show NGO details, issue details, and request message

**UI Components:**
- Request cards with NGO name, issue title, request message
- Approve/Reject buttons
- Notes textarea for authority feedback
- Status badges (Pending/Approved/Rejected)
- Filter by status and NGO

---

## Requirement #7: Trust Score in Citizen Profile

### **Current State:**
- User type has `trustScore` field
- Citizen Portal exists but no profile section

### **Implementation:**
- Add "Profile" section in Citizen Portal
- Display Trust Score with visual indicator
- Show score breakdown:
  - Issues Reported: +10 points each
  - Verified Issues: +20 points bonus
  - Community Engagement (upvotes): +5 points
  - False Reports: -50 points
- Add trust score badge (Bronze/Silver/Gold/Platinum)
- Show user statistics (total issues, resolved, pending)

**Trust Score Tiers:**
- 🥉 Bronze: 0-100
- 🥈 Silver: 101-300
- 🥇 Gold: 301-600
- 💎 Platinum: 601+

---

## Implementation Order

### **Phase 1: Image Handling (Requirements #3 & #4)**
1. Add image display in Authority Dashboard issue cards
2. Create before/after comparison component
3. Add image upload in Collaborator Portal
4. Test end-to-end image flow

### **Phase 2: NGO Requests (Requirement #6)**
1. Create NGO Requests tab in Authority Dashboard
2. Add approve/reject functionality
3. Add notes/feedback system
4. Test NGO-Authority workflow

### **Phase 3: Trust Score (Requirement #7)**
1. Add Profile tab in Citizen Portal
2. Display trust score with visualization
3. Show user statistics
4. Add trust score calculation logic

### **Phase 4: Branding (Requirement #5)**
1. Replace tricolor gradients
2. Update color scheme across all portals
3. Ensure consistency
4. Final review

---

## Files to Modify

### **Requirement #3 & #4:**
- `/src/app/components/AuthorityDashboard.tsx` - Add image display
- `/src/app/components/IssueQueue.tsx` - Show images in cards
- `/src/app/components/CollaboratorPortal.tsx` - Add upload functionality
- `/src/app/components/BeforeAfterImage.tsx` - NEW component

### **Requirement #5:**
- `/src/app/components/ModernLanding.tsx` - Update branding
- `/src/app/components/CitizenPortal.tsx` - Update header
- `/src/app/components/NGOPortal.tsx` - Update header
- `/src/app/components/AuthorityDashboard.tsx` - Update header
- `/src/app/components/CollaboratorPortal.tsx` - Update header

### **Requirement #6:**
- `/src/app/components/AuthorityDashboard.tsx` - Add NGO Requests tab
- `/src/app/components/NGORequestsTab.tsx` - NEW component
- `/src/utils/storage.ts` - Add approve/reject functions

### **Requirement #7:**
- `/src/app/components/CitizenPortal.tsx` - Add Profile section
- `/src/app/components/CitizenProfile.tsx` - NEW component
- `/src/utils/trustScore.ts` - NEW utility

---

## Testing Checklist

### **Images:**
- [ ] Citizen images visible in Authority Dashboard
- [ ] Resolution images upload successfully
- [ ] Before/After comparison displays correctly
- [ ] Images work on mobile responsive design

### **NGO Requests:**
- [ ] NGO can raise request
- [ ] Authority can see pending requests
- [ ] Approve/Reject works correctly
- [ ] NGO sees status updates

### **Trust Score:**
- [ ] Trust score displays correctly
- [ ] Score calculation is accurate
- [ ] Badge tier shows correctly
- [ ] Statistics update in real-time

### **Branding:**
- [ ] No tricolor gradients remain
- [ ] Consistent color scheme across portals
- [ ] Professional government appearance
- [ ] JANMARG branding prominent

---

**Ready to implement!** 🚀
