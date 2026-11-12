# Publishing RTMP Web Player Reminder (unlisted)

Everything you upload is in this `store` folder:

| File | Used for |
| --- | --- |
| `rtmp-web-player-reminder-<version>.zip` | The extension package (both stores) |
| `screenshot-1280x800.png` | Screenshot (both stores) |
| `promo-tile-440x280.png` | Small promo tile (Chrome, required; Edge, optional) |
| `logo-300x300.png` | Extension logo (Edge) |

The listing text to paste is at the bottom of this file.

---

## Chrome Web Store

1. **Create the developer account.** Go to
   <https://chrome.google.com/webstore/devconsole>, sign in with the Google account
   that should own the extension (ideally a shared work account), accept the agreement
   and pay the one-time $5 fee.
2. **Finish the account page.** In **Account**, set a contact email and verify it (you
   can't publish until it's verified), and complete the trader / non-trader declaration.
3. **Upload.** Click **New item** and upload the `rtmp-web-player-reminder-<version>.zip` file from `store/`.
4. **Store listing tab.**
   - Description: paste the *Description* below.
   - Category: *Productivity* (or the closest workflow/tools category offered).
   - Language: English.
   - Store icon: upload `extension/icons/icon128.png`.
   - Screenshots: upload `screenshot-1280x800.png`.
   - Small promo tile: upload `promo-tile-440x280.png`.
   - Click **Save draft**.
5. **Privacy tab.**
   - Single purpose: paste *Single purpose* below.
   - Permission justifications: paste each one from *Permission justifications* below.
   - Remote code: **No, I am not using remote code**.
   - Data usage: tick **nothing** (it collects no data), then tick the three
     certification boxes.
   - Click **Save draft**.
6. **Distribution tab.**
   - Payments: **Free**.
   - Visibility: **Unlisted**.
   - Regions: all regions.
   - Click **Save draft**.
7. **Submit for review.** Click **Submit for review**. Review usually takes a few days.
   You'll get an email when it's approved.
8. **Get the link.** Once published, the item page shows the store link and the
   32-letter **item ID**. Share the link with users. Use the ID for policy force-install.

## Microsoft Edge Add-ons

1. **Create the developer account.** Go to
   <https://partner.microsoft.com/dashboard/microsoftedge>, sign in with a Microsoft
   account (ideally a work one) and register for the Microsoft Edge program. It's free.
   Fill in the contact details. Microsoft may email to verify them.
2. **Upload.** Click **Create new extension** and upload the `rtmp-web-player-reminder-<version>.zip` file from `store/`.
3. **Availability.**
   - Visibility: **Hidden**.
   - Markets: all markets.
   - Click **Save**.
4. **Properties.**
   - Category: *Productivity*.
   - "Does your extension access, collect or transmit personal information?": **No**.
   - Support contact: your email or website.
   - Mature content: No.
   - Click **Save**.
5. **Store listings.** Open **English**, then:
   - Description: paste the *Description* below.
   - Extension logo: upload `logo-300x300.png`.
   - Small promotional tile: `promo-tile-440x280.png` (optional).
   - Screenshots: `screenshot-1280x800.png` (optional).
   - Short description: paste *Short description* below.
   - Click **Save**.
6. **Submit.** Click **Publish**. In *Notes for certification*, paste the
   *Notes for reviewers* below. Review usually takes up to 7 working days.
7. **Get the link.** When it's live, the extension's **Overview** page shows the store
   link and the **CRX ID**. Share the link with users. Use the ID for policy force-install.

## Updating later

The version number raises itself. Whenever a change to anything in `extension/` is
pushed to GitHub (including files added through GitHub's "Upload files"), the
**Bump extension version** action:

1. raises the last number of `version` in `extension/manifest.json` (e.g. `1.0.0` to `1.0.1`),
2. rebuilds the zip as `store/rtmp-web-player-reminder-<version>.zip`, removing the old one,
3. commits both back to the same branch, about a minute after your push.

Then pull (or download) the new zip from `store/` and upload it:

- Chrome: open the item, choose **Package**, then **Upload new package**, and submit for review.
- Edge: open the extension, choose **Update**, upload the new zip and publish.

Installed copies update on their own once the new version is approved.

If you're working locally instead, run this to do the same thing by hand:

```bash
python3 scripts/release.py
```

To rebuild the zip without changing the version, add `--no-bump`.

---

## Listing text

### Name
RTMP Web Player Reminder

### Short description (max 132 characters)
Reminds you that streams are now run through RTMP Web Player when you open Restream, with an option to continue.

### Description
When you open restream.io, RTMP Web Player Reminder shows a short notice explaining that we no
longer use Restream, and that everything (including YouTube and Facebook) now runs
through RTMP Web Player.

From the notice you can:
- go straight to RTMP Web Player, or
- click "Proceed to Restream" if you need Restream for something else. Restream then
  works as normal for that visit.

The extension only acts on restream.io. It collects no data and sends nothing anywhere.

### Single purpose
Shows a notice when someone opens restream.io that points them to RTMP Web Player
instead, with an option to continue to Restream.

### Permission justifications

**declarativeNetRequestWithHostAccess**
Used to redirect page visits to restream.io to the extension's built-in notice page,
and to let a single visit through when the user clicks "Proceed to Restream".

**tabs**
Used to detect when the tab that clicked "Proceed" navigates away from restream.io,
so the one-visit allowance ends and the notice shows again on the next visit. No tab
data is stored or sent anywhere.

**Host permissions (restream.io, \*.restream.io)**
The redirect only applies to restream.io and its subdomains. No other sites are
affected.

### Notes for reviewers
To test: install the extension and visit https://restream.io. A notice page appears.
"RTMP Web Player" opens https://stream.rossmackenzie.co.uk. "Proceed to Restream"
continues to the original Restream page. The extension makes no network requests and
collects no data.
