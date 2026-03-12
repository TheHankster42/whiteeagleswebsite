/**
 * White Eagles – Events page: load and display events from Supabase
 */
(function () {
    var loadingEl = document.getElementById('events-loading');
    var errorEl = document.getElementById('events-error');
    var emptyEl = document.getElementById('events-empty');
    var listEl = document.getElementById('events-list');

    if (!listEl) return;

    var config = window.SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey || config.url.indexOf('YOUR_PROJECT') !== -1) {
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) {
            errorEl.textContent = 'Events are not configured. Add your Supabase URL and anon key in supabase-config.js and run the SQL in supabase/schema.sql.';
            errorEl.style.display = 'block';
        }
        return;
    }

    var supabase = window.supabase.createClient(config.url, config.anonKey);

    function formatDate(iso) {
        var d = new Date(iso);
        return d.toLocaleDateString('en-CA', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'America/Edmonton'
        });
    }

    function renderEvents(events) {
        listEl.innerHTML = '';
        if (!events || events.length === 0) {
            if (loadingEl) loadingEl.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'block';
            return;
        }
        if (loadingEl) loadingEl.style.display = 'none';
        events.forEach(function (event) {
            var card = document.createElement('article');
            card.className = 'event-card';
            var title = document.createElement('h3');
            title.textContent = event.title || 'Event';
            var date = document.createElement('p');
            date.className = 'event-date';
            date.textContent = formatDate(event.event_date);
            card.appendChild(title);
            card.appendChild(date);
            if (event.location) {
                var loc = document.createElement('p');
                loc.className = 'event-location';
                loc.textContent = event.location;
                card.appendChild(loc);
            }
            if (event.description) {
                var desc = document.createElement('div');
                desc.className = 'event-description';
                desc.textContent = event.description;
                card.appendChild(desc);
            }
            listEl.appendChild(card);
        });
    }

    function showError(msg) {
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) {
            errorEl.textContent = msg || 'Failed to load events.';
            errorEl.style.display = 'block';
        }
    }

    supabase
        .from('events')
        .select('id, title, description, event_date, location')
        .order('event_date', { ascending: true })
        .then(function (result) {
            if (result.error) {
                showError(result.error.message);
                return;
            }
            renderEvents(result.data);
        })
        .catch(function (err) {
            showError(err && err.message ? err.message : 'Failed to load events.');
        });
})();
